import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICONS } from '../constants';
import type { BackendJobOpening } from '../types';
import { useJobOpeningManagement } from '../hooks/useJobOpeningManagement';
import ConfirmDialog from '../../components/layout/confirm-dialog';

type JobOpeningPayload = Omit<BackendJobOpening, '_id'>;

const emptyFormData: JobOpeningPayload = {
  title: '',
  location: '',
  type: '',
  experience: '',
  skills: '',
};

const JobOpeningsView: React.FC = () => {
  const {
    jobOpenings,
    isLoading,
    error,
    fetchJobOpenings,
    createJobOpening,
    updateJobOpening,
    deleteJobOpening,
  } = useJobOpeningManagement();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJobOpening, setEditingJobOpening] = useState<BackendJobOpening | null>(null);
  const [formData, setFormData] = useState<JobOpeningPayload>(emptyFormData);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [jobOpeningToDelete, setJobOpeningToDelete] = useState<BackendJobOpening | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchJobOpenings();
  }, [fetchJobOpenings]);

  const openCreateForm = () => {
    setEditingJobOpening(null);
    setFormData(emptyFormData);
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditForm = (jobOpening: BackendJobOpening) => {
    setEditingJobOpening(jobOpening);
    setFormData({
      title: jobOpening.title,
      location: jobOpening.location,
      type: jobOpening.type,
      experience: jobOpening.experience,
      skills: jobOpening.skills,
    });
    setFormError('');
    setIsFormOpen(true);
  };

  const requestDelete = (jobOpening: BackendJobOpening) => {
    setJobOpeningToDelete(jobOpening);
    setIsConfirmOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      if (editingJobOpening) {
        await updateJobOpening(editingJobOpening._id, formData);
      } else {
        await createJobOpening(formData);
      }
      setIsFormOpen(false);
      setEditingJobOpening(null);
      setFormData(emptyFormData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data?.message || 'Failed to save job opening');
      } else if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Failed to save job opening');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!jobOpeningToDelete) return;
    setIsDeleting(true);
    try {
      await deleteJobOpening(jobOpeningToDelete._id);
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setJobOpeningToDelete(null);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Job Openings</h2>
          <p className="text-slate-500 text-sm font-medium">
            Manage career openings shown on the public Careers page.
          </p>
        </div>
        <button
          onClick={openCreateForm}
          className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20 flex items-center gap-2 w-fit"
        >
          <ICONS.Plus size={18} /> Add Job Opening
        </button>
      </div>

      {error ? (
        <div className="mb-4 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
          {error}
        </div>
      ) : null}

      {isLoading && jobOpenings.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-slate-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
        </div>
      ) : null}

      {!isLoading && jobOpenings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-500">No job openings found. Add one to get started.</p>
        </div>
      ) : null}

      {jobOpenings.length > 0 ? (
        <div className="flex flex-col gap-4">
          {jobOpenings.map((jobOpening) => (
            <div
              key={jobOpening._id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group p-5"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                    {jobOpening.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                      {jobOpening.location}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                      {jobOpening.type}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                      {jobOpening.experience}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                      {jobOpening.skills}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEditForm(jobOpening)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors"
                  >
                    <ICONS.FileText size={14} /> Edit
                  </button>
                  <button
                    onClick={() => requestDelete(jobOpening)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <ICONS.X size={14} /> Delete
                  </button>
                </div>
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
                {editingJobOpening ? 'Edit Job Opening' : 'Create Job Opening'}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Type</label>
                  <input
                    type="text"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    required
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
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
                  {isSubmitting ? 'Saving...' : editingJobOpening ? 'Update Job Opening' : 'Create Job Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={isConfirmOpen}
        title="Delete job opening?"
        message={
          jobOpeningToDelete
            ? `This will permanently delete "${jobOpeningToDelete.title}".`
            : 'This action cannot be undone.'
        }
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (isDeleting) return;
          setIsConfirmOpen(false);
          setJobOpeningToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default JobOpeningsView;
