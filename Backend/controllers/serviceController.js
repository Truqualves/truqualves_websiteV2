import Service from "../model/Service.js";
import imagekit from "../services/imageKit.js";
import fs from "fs";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
};

const pickField = (body, ...keys) => {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      const value = body[key];
      if (value !== undefined && value !== null) return value;
    }
  }
  return undefined;
};

const cleanupTempFile = (file) => {
  if (!file?.path) return;
  fs.unlink(file.path, (err) => {
    if (err) console.error("Error deleting temp file:", err);
  });
};

const toServiceId = (value) => {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
};

const getNextServiceId = async () => {
  const latest = await Service.findOne({}, { id: 1 }).sort({ id: -1 }).lean();
  return (latest?.id || 0) + 1;
};

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getUniqueSlug = async (title) => {
  const base = slugify(title);
  if (!base) return "";

  let candidate = base;
  let suffix = 2;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const exists = await Service.exists({ slug: candidate });
    if (!exists) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
};

const parseFaq = (faqInput) => {
  if (
    faqInput === undefined ||
    faqInput === null ||
    faqInput === "" ||
    (Array.isArray(faqInput) && faqInput.length === 0)
  ) {
    return [];
  }

  let parsed = faqInput;

  if (typeof faqInput === "string") {
    try {
      parsed = JSON.parse(faqInput);
    } catch {
      throw new Error("Invalid FAQ format: must be valid JSON array");
    }
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Invalid FAQ format: expected an array");
  }

  for (const item of parsed) {
    if (
      !item ||
      typeof item.question !== "string" ||
      typeof item.answer !== "string"
    ) {
      throw new Error(
        "Invalid FAQ entry: each item must include string question and answer",
      );
    }
  }

  return parsed;
};

const buildPayload = (body) => {
  const nestedContent =
    body.contentBody && typeof body.contentBody === "object" ? body.contentBody : {};

  const category = normalizeArray(body.category || body["category[]"]);
  const deliverables = normalizeArray(
    pickField(
      body,
      "contentBody.deliverables",
      "contentBody[deliverables]",
      "deliverables",
    ) ?? nestedContent.deliverables,
  );

  const faqRaw =
    pickField(body, "contentBody.faq", "contentBody[faq]", "faq") ??
    nestedContent.faq ??
    [];
  const faq = parseFaq(faqRaw);

  const parsedDisplayOrder = Number(body.displayOrder ?? 0);
  if (!Number.isFinite(parsedDisplayOrder)) {
    throw new Error("Invalid displayOrder");
  }

  return {
    id: Number(body.id),
    slug: body.slug,
    title: body.title,
    shortDescription: body.shortDescription,
    heroImage: body.heroImage || "",
    iconKey: body.iconKey || "Wrench",
    category,
    featured: String(body.featured) === "true" || body.featured === true,
    status: body.status || "draft",
    displayOrder: parsedDisplayOrder,
    contentBody: {
      overview:
        pickField(body, "contentBody.overview", "contentBody[overview]") ??
        nestedContent.overview ??
        "",
      scope:
        pickField(body, "contentBody.scope", "contentBody[scope]") ??
        nestedContent.scope ??
        "",
      methodology:
        pickField(body, "contentBody.methodology", "contentBody[methodology]") ??
        nestedContent.methodology ??
        "",
      deliverables,
      faq,
      conclusion:
        pickField(body, "contentBody.conclusion", "contentBody[conclusion]") ??
        nestedContent.conclusion ??
        "",
    },
  };
};

// GET /api/services
export const getAllServices = async (req, res) => {
  try {
    const includeDraft = String(req.query.includeDraft || "false") === "true";
    const query = includeDraft ? {} : { status: "published" };

    const services = await Service.find(query).sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    });

    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/services/:slug
export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const slugLower = String(slug).toLowerCase();
    if (!SLUG_REGEX.test(slugLower)) {
      return res.status(400).json({ message: "Invalid service slug format" });
    }

    const includeDraft = String(req.query.includeDraft || "false") === "true";

    const query = includeDraft
      ? { slug: slugLower }
      : { slug: slugLower, status: "published" };

    const service = await Service.findOne(query);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/services
export const createService = async (req, res) => {
  try {
    const { title, shortDescription } = req.body;

    if (!title || !shortDescription) {
      cleanupTempFile(req.file);
      return res.status(400).json({ message: "Missing required fields" });
    }

    const serviceId = await getNextServiceId();

    const slugLower = await getUniqueSlug(title);
    if (!slugLower || !SLUG_REGEX.test(slugLower)) {
      cleanupTempFile(req.file);
      return res.status(400).json({ message: "Unable to generate valid service slug" });
    }

    let uploadedHeroImageUrl = "";

    if (req.file) {
      const file = req.file;
      try {
        const fileStream = fs.createReadStream(file.path);
        const uploadResponse = await imagekit.files.upload({
          file: fileStream,
          fileName: `service_${serviceId}_${Date.now()}`,
          folder: "/services",
        });
        uploadedHeroImageUrl = uploadResponse.url;
      } catch (uploadError) {
        return res.status(500).json({
          message: "Hero image upload failed",
          error: uploadError.message,
        });
      } finally {
        cleanupTempFile(file);
      }
    }

    const payload = buildPayload({
      ...req.body,
      id: serviceId,
      slug: slugLower,
      heroImage:
        uploadedHeroImageUrl ||
        (typeof req.body.heroImage === "string" ? req.body.heroImage : ""),
    });

    const newService = await Service.create(payload);

    return res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    cleanupTempFile(req.file);
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/services/:id
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceId = toServiceId(id);

    if (!serviceId) {
      cleanupTempFile(req.file);
      return res.status(400).json({ message: "Invalid service ID" });
    }

    if (req.body.id && Number(req.body.id) !== serviceId) {
      cleanupTempFile(req.file);
      return res.status(400).json({ message: "Cannot change service ID" });
    }

    const existing = await Service.findOne({ id: serviceId });
    if (!existing) {
      cleanupTempFile(req.file);
      return res.status(404).json({ message: "Service not found" });
    }

    const slugLower = req.body.slug
      ? String(req.body.slug).toLowerCase()
      : existing.slug;
    if (!SLUG_REGEX.test(slugLower)) {
      cleanupTempFile(req.file);
      return res.status(400).json({ message: "Invalid service slug format" });
    }

    if (slugLower) {
      const slugConflict = await Service.findOne({
        slug: slugLower,
        id: { $ne: serviceId },
      });
      if (slugConflict) {
        cleanupTempFile(req.file);
        return res.status(400).json({ message: "Service slug already in use" });
      }
    }

    let uploadedHeroImageUrl = "";
    if (req.file) {
      const file = req.file;
      try {
        const fileStream = fs.createReadStream(file.path);
        const uploadResponse = await imagekit.files.upload({
          file: fileStream,
          fileName: `service_${serviceId}_${Date.now()}`,
          folder: "/services",
        });
        uploadedHeroImageUrl = uploadResponse.url;
      } catch (uploadError) {
        return res.status(500).json({
          message: "Hero image upload failed",
          error: uploadError.message,
        });
      } finally {
        cleanupTempFile(file);
      }
    }

    const hasHeroImageField = Object.prototype.hasOwnProperty.call(
      req.body,
      "heroImage",
    );
    const finalHeroImage = uploadedHeroImageUrl
      ? uploadedHeroImageUrl
      : hasHeroImageField
        ? String(req.body.heroImage || "")
        : existing.heroImage || "";

    const payload = buildPayload({
      ...existing.toObject(),
      ...req.body,
      id: serviceId,
      slug: slugLower,
      heroImage: finalHeroImage,
    });

    const updatedService = await Service.findOneAndUpdate(
      { id: serviceId },
      payload,
      { new: true },
    );

    return res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    cleanupTempFile(req.file);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/services/:id
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceId = toServiceId(id);
    if (!serviceId) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const deletedService = await Service.findOneAndDelete({ id: serviceId });

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
