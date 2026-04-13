import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICONS } from '../../constants';
import type { BackendCaseStudy } from '../../types';

interface CaseStudyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<BackendCaseStudy, '_id'>, isEdit: boolean, id?: string) => Promise<void>;
  initialData?: BackendCaseStudy | null;
}

export const CaseStudyForm: React.FC<CaseStudyFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    tag: '',
    industry: '',
    title: '',
    challenge: '',
    approach: '',
    result: '',
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        tag: initialData.tag,
        industry: initialData.industry,
        title: initialData.title,
        challenge: initialData.challenge,
        approach: initialData.approach,
        result: initialData.result,
      });
    } else {
      setFormData({
        tag: '',
        industry: '',
        title: '',
        challenge: '',
        approach: '',
        result: '',
      });
    }

    setFormError('');
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      await onSubmit(formData, !!initialData, initialData?._id);
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
            {initialData ? 'Edit Case Study' : 'Create New Case Study'}
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
              <label className="text-sm font-semibold text-slate-700">Tag</label>
              <input
                type="text"
                name="tag"
                required
                value={formData.tag}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Industry</label>
              <input
                type="text"
                name="industry"
                required
                value={formData.industry}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

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

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Challenge</label>
            <textarea
              name="challenge"
              required
              rows={4}
              value={formData.challenge}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Approach</label>
            <textarea
              name="approach"
              required
              rows={4}
              value={formData.approach}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Result</label>
            <textarea
              name="result"
              required
              rows={4}
              value={formData.result}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
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
              className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update Case Study' : 'Create Case Study'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
