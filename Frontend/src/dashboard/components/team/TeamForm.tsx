import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICONS } from '../../constants';
import type { BackendTeamMember } from '../../types';

interface TeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, isEdit: boolean, id?: string) => Promise<void>;
  initialData?: BackendTeamMember | null;
}

export const TeamForm: React.FC<TeamFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    desc: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setImageFile(null);

    if (initialData) {
      setFormData({
        name: initialData.name,
        role: initialData.role,
        desc: initialData.desc,
      });
      setExistingImage(initialData.image);
    } else {
      setFormData({
        name: '',
        role: '',
        desc: '',
      });
      setExistingImage(null);
    }

    setFormError('');
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('role', formData.role);
      data.append('desc', formData.desc);

      if (imageFile) {
        data.append('image', imageFile);
      } else if (existingImage) {
        data.append('image', existingImage);
      }

      await onSubmit(data, !!initialData, initialData?._id);
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data?.message || 'An error occurred. Please try again.');
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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Team Member' : 'Add Team Member'}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Role</label>
              <input
                type="text"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea
              name="desc"
              required
              rows={4}
              value={formData.desc}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Image</label>
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
                  {imageFile ? imageFile.name : existingImage ? 'Keep Current Image' : 'Click to upload image'}
                </span>
                {!imageFile && existingImage ? (
                  <span className="text-[10px] text-teal-600 truncate max-w-[220px]">
                    {existingImage}
                  </span>
                ) : null}
              </div>
            </div>
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
              className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update Team Member' : 'Add Team Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
