import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICONS } from '../../constants';
import type { BackendService } from '../../types';

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, isEdit: boolean, id?: number) => Promise<void>;
  initialData?: BackendService | null;
  totalServices: number;
}

const AVAILABLE_ICON_KEYS = [
  "Wrench",
  "Monitor",
  "Shield",
  "FlaskConical",
  "ClipboardCheck",
  "AlertTriangle",
  "Thermometer",
  "Factory",
  "GraduationCap",
  "Layers",
  "GitBranch",
  "Database",
  "Microscope",
  "ScanLine",
  "HeartPulse",
  "Snowflake",
  "Package",
] as const;

export const ServiceForm: React.FC<ServiceFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  totalServices,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    iconKey: 'Wrench',
    status: 'draft',
    displayOrder: 0,
    featured: false,
    category: '',
    overview: '',
    scope: '',
    methodology: '',
    deliverables: '',
    faq: '',
    conclusion: '',
  });

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [existingHeroImage, setExistingHeroImage] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        title: initialData.title || '',
        shortDescription: initialData.shortDescription || '',
        iconKey: initialData.iconKey || 'Wrench',
        status: initialData.status || 'draft',
        displayOrder: initialData.displayOrder || 0,
        featured: !!initialData.featured,
        category: initialData.category?.join(', ') || '',
        overview: initialData.contentBody?.overview || '',
        scope: initialData.contentBody?.scope || '',
        methodology: initialData.contentBody?.methodology || '',
        deliverables: initialData.contentBody?.deliverables?.join('\n') || '',
        faq:
          initialData.contentBody?.faq
            ?.map((item) => `${item.question} | ${item.answer}`)
            .join('\n') || '',
        conclusion: initialData.contentBody?.conclusion || '',
      });
      setExistingHeroImage(initialData.heroImage || null);
    } else {
      setFormData({
        title: '',
        shortDescription: '',
        iconKey: 'Wrench',
        status: 'draft',
        displayOrder: 0,
        featured: false,
        category: '',
        overview: '',
        scope: '',
        methodology: '',
        deliverables: '',
        faq: '',
        conclusion: '',
      });
      setExistingHeroImage(null);
      setHeroImageFile(null);
    }

    setFormError('');
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHeroImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      const data = new FormData();
      const serviceId = initialData ? initialData.id : undefined;
      if (serviceId) {
        data.append('id', serviceId.toString());
      }
      data.append('title', formData.title);
      data.append('shortDescription', formData.shortDescription);
      data.append('iconKey', formData.iconKey);
      data.append('status', formData.status);
      data.append('displayOrder', String(formData.displayOrder || 0));
      data.append('featured', String(formData.featured));

      const categories = formData.category
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);
      categories.forEach((cat) => data.append('category[]', cat));

      data.append('contentBody[overview]', formData.overview);
      data.append('contentBody[scope]', formData.scope);
      data.append('contentBody[methodology]', formData.methodology);
      data.append('contentBody[conclusion]', formData.conclusion);

      const deliverables = formData.deliverables
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean);
      deliverables.forEach((item) => data.append('contentBody[deliverables]', item));

      const faq = formData.faq
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [question, ...answerParts] = line.split('|');
          return {
            question: (question || '').trim(),
            answer: answerParts.join('|').trim(),
          };
        })
        .filter((item) => item.question && item.answer);

      data.append('contentBody[faq]', JSON.stringify(faq));

      if (heroImageFile) {
        data.append('heroImage', heroImageFile);
      } else if (existingHeroImage) {
        data.append('heroImage', existingHeroImage);
      }

      await onSubmit(data, !!initialData, initialData?.id);
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data?.message || 'An error occurred. Please try again.');
      } else if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('An error occurred. Please try again.');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Service' : 'Create New Service'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <ICONS.X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {formError ? (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {formError}
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Short Description</label>
            <textarea
              name="shortDescription"
              required
              rows={3}
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
              <p className="text-xs text-slate-500">
                Current services count: {totalServices}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Icon Key</label>
              <select
                name="iconKey"
                value={formData.iconKey}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none"
              >
                {AVAILABLE_ICON_KEYS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Featured</label>
              <label className="w-full h-[42px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Mark as featured
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Categories (comma separated)</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="CSV, GAMP 5, Compliance"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Hero Image</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <ICONS.FileText size={24} />
                <span className="text-sm font-medium">
                  {heroImageFile ? heroImageFile.name : existingHeroImage ? 'Keep Current Hero Image' : 'Click to upload hero image'}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />
          <h4 className="font-bold text-slate-800">Service Detail Content</h4>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Overview</label>
            <textarea
              name="overview"
              rows={3}
              value={formData.overview}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Scope</label>
            <textarea
              name="scope"
              rows={3}
              value={formData.scope}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Methodology</label>
            <textarea
              name="methodology"
              rows={3}
              value={formData.methodology}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Deliverables (one per line)</label>
            <textarea
              name="deliverables"
              rows={4}
              value={formData.deliverables}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">FAQ (one per line, format: Question | Answer)</label>
            <textarea
              name="faq"
              rows={4}
              value={formData.faq}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Conclusion</label>
            <textarea
              name="conclusion"
              rows={3}
              value={formData.conclusion}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
