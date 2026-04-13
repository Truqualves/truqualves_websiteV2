import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICONS } from '../constants';
import { useContactInfoManagement } from '../hooks/useContactInfoManagement';
import type { BackendContactInfo } from '../types';

const emptyContactInfo: BackendContactInfo = {
  officeAddress: '',
  phone: '',
  email: '',
  businessHours: '',
  consultationText: '',
};

const ContactInfoView: React.FC = () => {
  const {
    contactInfo,
    isLoading,
    error,
    fetchContactInfo,
    updateContactInfo,
  } = useContactInfoManagement();

  const [formData, setFormData] = useState<BackendContactInfo>(emptyContactInfo);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  useEffect(() => {
    setFormData({
      ...emptyContactInfo,
      ...contactInfo,
    });
  }, [contactInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    setIsSaving(true);

    try {
      await updateContactInfo(formData);
      setSuccessMessage('Contact information saved.');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data?.message || 'Unable to save contact information.');
      } else if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Unable to save contact information.');
      }
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Contact Information</h2>
          <p className="text-slate-500 text-sm font-medium">
            Manage the contact details shown on the public Contact page.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6 max-w-4xl">
        {error ? (
          <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        ) : null}

        {formError ? (
          <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {formError}
          </div>
        ) : null}

        {successMessage ? (
          <div className="p-4 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-100">
            {successMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-600" />
            Loading contact information...
          </div>
        ) : null}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Office Address</label>
          <textarea
            name="officeAddress"
            rows={4}
            value={formData.officeAddress || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Phone</label>
            <textarea
              name="phone"
              rows={3}
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <textarea
              name="email"
              rows={3}
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Business Hours</label>
          <textarea
            name="businessHours"
            rows={3}
            value={formData.businessHours || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Consultation Text</label>
          <textarea
            name="consultationText"
            rows={4}
            value={formData.consultationText || ''}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ICONS.FileText size={16} />
            {isSaving ? 'Saving...' : 'Save Contact Info'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfoView;
