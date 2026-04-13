import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { JobOpening } from "@/types/jobOpening";
import type { JobCandidateFormData } from "./types";
import { emptyJobCandidateFormData } from "./types";

interface ApplyJobDialogProps {
  isOpen: boolean;
  selectedOpening: JobOpening | null;
  openings: JobOpening[];
  onClose: () => void;
}

export default function ApplyJobDialog({
  isOpen,
  selectedOpening,
  openings,
  onClose,
}: ApplyJobDialogProps) {
  const [formData, setFormData] = useState<JobCandidateFormData>(emptyJobCandidateFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFormData({
      ...emptyJobCandidateFormData,
      roleAppliedFor: selectedOpening?.title || "",
    });
  }, [isOpen, selectedOpening]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: Record<string, string> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        currentLocation: formData.currentLocation,
        totalExperience: formData.totalExperience,
        currentSalary: formData.currentSalary,
        expectedSalary: formData.expectedSalary,
        roleAppliedFor: formData.roleAppliedFor,
        currentCompany: formData.currentCompany,
        resumeLink: formData.resumeLink,
        whyShouldWeHireYou: formData.whyShouldWeHireYou,
      };

      if (
        selectedOpening &&
        formData.roleAppliedFor.trim().toLowerCase() === selectedOpening.title.trim().toLowerCase()
      ) {
        payload.jobOpeningId = selectedOpening._id;
      }

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/job-candidates`, payload);
      toast.success("Application submitted successfully.");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to submit application.");
      } else {
        toast.error("Failed to submit application.");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-800">Apply for Role</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Location</label>
              <input
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Total Experience</label>
              <input
                name="totalExperience"
                value={formData.totalExperience}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Salary</label>
              <input
                name="currentSalary"
                value={formData.currentSalary}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Expected Salary</label>
              <input
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role Applied For</label>
            <select
              name="roleAppliedFor"
              value={formData.roleAppliedFor}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="" disabled>
                Select role
              </option>
              {openings.map((opening) => (
                <option key={opening._id} value={opening.title}>
                  {opening.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Company</label>
              <input
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Resume Link (Google Drive, OneDrive, etc.)
              </label>
              <input
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Why should we hire you?
            </label>
            <textarea
              name="whyShouldWeHireYou"
              value={formData.whyShouldWeHireYou}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded-xl transition-all hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
