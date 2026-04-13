import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICONS } from '../constants';
import type { BackendIndustry } from '../types';
import { useIndustryManagement } from '../hooks/useIndustryManagement';
import ConfirmDialog from '../../components/layout/confirm-dialog';

type IndustryPayload = Omit<BackendIndustry, '_id'>;

const INDUSTRY_ICON_OPTIONS = [
  'Pill',
  'Stethoscope',
  'Factory',
  'Beaker',
  'Building2',
  'Leaf',
  'FlaskConical',
  'Microscope',
  'HeartPulse',
  'ShieldCheck',
  'Cpu',
  'Database',
  'Dna',
  'TestTube2',
  'Syringe',
  'Hospital',
];

const emptyFormData: IndustryPayload = {
  title: '',
  description: '',
  iconKey: 'Pill',
};

const IndustriesView: React.FC = () => {
  const {
    industries,
    isLoading,
    error,
    fetchIndustries,
    createIndustry,
    updateIndustry,
    deleteIndustry,
  } = useIndustryManagement();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<BackendIndustry | null>(null);
  const [formData, setFormData] = useState<IndustryPayload>(emptyFormData);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [industryToDelete, setIndustryToDelete] = useState<BackendIndustry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchIndustries();
  }, [fetchIndustries]);

  const openCreateForm = () => {
    setEditingIndustry(null);
    setFormData(emptyFormData);
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditForm = (industry: BackendIndustry) => {
    setEditingIndustry(industry);
    setFormData({
      title: industry.title,
      description: industry.description,
      iconKey: industry.iconKey,
    });
    setFormError('');
    setIsFormOpen(true);
  };

  const requestDelete = (industry: BackendIndustry) => {
    setIndustryToDelete(industry);
    setIsConfirmOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      if (editingIndustry) {
        await updateIndustry(editingIndustry._id, formData);
      } else {
        await createIndustry(formData);
      }
      setIsFormOpen(false);
      setEditingIndustry(null);
      setFormData(emptyFormData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data?.message || 'Failed to save industry');
      } else if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Failed to save industry');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!industryToDelete) return;
    setIsDeleting(true);
    try {
      await deleteIndustry(industryToDelete._id);
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setIndustryToDelete(null);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Industries</h2>
          <p className="text-slate-500 text-sm font-medium">
            Manage industries shown on the public Industries page.
          </p>
        </div>
        <button
          onClick={openCreateForm}
          className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20 flex items-center gap-2 w-fit"
        >
          <ICONS.Plus size={18} /> Add Industry
        </button>
      </div>

      {error ? (
        <div className="mb-4 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
          {error}
        </div>
      ) : null}

      {isLoading && industries.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-slate-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
        </div>
      ) : null}

      {!isLoading && industries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-500">No industries found. Add one to get started.</p>
        </div>
      ) : null}

      {industries.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {industries.map((industry) => (
            <div
              key={industry._id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group p-5"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                  {industry.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-4">
                  {industry.description}
                </p>
                <div className="mt-3">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                    {industry.iconKey}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => openEditForm(industry)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors"
                >
                  <ICONS.FileText size={14} /> Edit
                </button>
                <button
                  onClick={() => requestDelete(industry)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <ICONS.X size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {isFormOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-800">
                {editingIndustry ? 'Edit Industry' : 'Create Industry'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              >
                <ICONS.X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {formError ? (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                  {formError}
                </div>
              ) : null}

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
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Icon</label>
                <select
                  name="iconKey"
                  required
                  value={formData.iconKey}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  {INDUSTRY_ICON_OPTIONS.map((iconKey) => (
                    <option key={iconKey} value={iconKey}>
                      {iconKey}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : editingIndustry ? 'Update Industry' : 'Create Industry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={isConfirmOpen}
        title="Delete industry?"
        message={
          industryToDelete
            ? `This will permanently delete "${industryToDelete.title}".`
            : 'This action cannot be undone.'
        }
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (isDeleting) return;
          setIsConfirmOpen(false);
          setIndustryToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default IndustriesView;
