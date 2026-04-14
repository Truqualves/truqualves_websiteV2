import React, { useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { JobCandidateStatus } from '../types';
import ConfirmDialog from '../../components/layout/confirm-dialog';
import { useJobCandidateManagement } from '../hooks/useJobCandidateManagement';

const STATUS_META: Record<JobCandidateStatus, { label: string; tone: string }> = {
  new_request: { label: 'New Request', tone: 'bg-amber-50 text-amber-700 border-amber-100' },
  shortlisted: { label: 'Shortlisted', tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  rejected: { label: 'Rejected', tone: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const STATUS_TABS: { key: JobCandidateStatus; label: string }[] = [
  { key: 'new_request', label: 'New Request' },
  { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'rejected', label: 'Rejected' },
];

const CandidateInfoView: React.FC = () => {
  const {
    candidates,
    loading,
    error,
    actionLoading,
    fetchCandidates,
    updateCandidateStatus,
    deleteCandidate,
  } = useJobCandidateManagement();

  const [activeStatus, setActiveStatus] = useState<JobCandidateStatus>('new_request');
  const [searchTerm, setSearchTerm] = useState('');
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);
  const [pendingCandidateId, setPendingCandidateId] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState<JobCandidateStatus | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState<string>('');

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const grouped = useMemo(() => {
    return {
      new_request: candidates.filter((candidate) => candidate.status === 'new_request'),
      shortlisted: candidates.filter((candidate) => candidate.status === 'shortlisted'),
      rejected: candidates.filter((candidate) => candidate.status === 'rejected'),
    };
  }, [candidates]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const base = grouped[activeStatus] || [];
    if (!term) return base;

    return base.filter((candidate) =>
      [
        candidate.firstName,
        candidate.lastName,
        candidate.email,
        candidate.phone,
        candidate.currentLocation,
        candidate.totalExperience,
        candidate.roleAppliedFor,
        candidate.currentCompany,
        candidate.resumeLink,
        candidate.whyShouldWeHireYou,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(term)),
    );
  }, [grouped, activeStatus, searchTerm]);

  const requestStatusChange = (candidateId: string, status: JobCandidateStatus) => {
    setPendingCandidateId(candidateId);
    setPendingStatus(status);
    setIsStatusConfirmOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!pendingCandidateId || !pendingStatus) return;
    await updateCandidateStatus(pendingCandidateId, pendingStatus);
    setIsStatusConfirmOpen(false);
    setPendingCandidateId(null);
    setPendingStatus(null);
  };

  const cancelStatusChange = () => {
    setIsStatusConfirmOpen(false);
    setPendingCandidateId(null);
    setPendingStatus(null);
  };

  const requestDelete = (candidateId: string) => {
    setPendingDeleteId(candidateId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    await deleteCandidate(pendingDeleteId);
    setIsDeleteConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const openMessage = (content?: string) => {
    setMessageContent(content || 'No response provided.');
    setIsMessageOpen(true);
  };

  const closeMessage = () => {
    setIsMessageOpen(false);
    setMessageContent('');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-none">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Data</h2>
          <p className="text-slate-500 text-sm font-medium">
            Review applications and update final candidate decisions.
          </p>
        </div>

        <div className="w-full lg:w-[320px]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidates..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="bg-slate-50/60 rounded-3xl border border-slate-100 p-4 md:p-6 w-full max-w-none flex flex-col">
        <div className="bg-white border border-slate-100 rounded-2xl p-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {STATUS_TABS.map((tab) => {
              const isActive = activeStatus === tab.key;
              const count = grouped[tab.key].length;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveStatus(tab.key)}
                  className={`px-3 py-2 rounded-xl transition-colors text-sm font-semibold flex items-center gap-2 ${
                    isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-xs font-bold">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full min-w-0">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  {STATUS_META[activeStatus].label}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_META[activeStatus].tone}`}>
                  {filteredRows.length} records
                </span>
              </div>

              {loading ? (
                <div className="p-8 text-sm text-slate-500">Loading candidates...</div>
              ) : null}

              {!loading && error ? (
                <div className="p-8 text-sm text-red-600">{error}</div>
              ) : null}

              {!loading && !error && filteredRows.length === 0 ? (
                <div className="p-8 text-sm text-slate-500">No candidates in this status.</div>
              ) : null}

              {!loading && !error && filteredRows.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-slate-50">
                      <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <th className="px-4 py-3">First Name</th>
                        <th className="px-4 py-3">Last Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Phone</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Experience</th>
                        <th className="px-4 py-3">Current Company</th>
                        <th className="px-4 py-3">Current Salary</th>
                        <th className="px-4 py-3">Expected Salary</th>
                        <th className="px-4 py-3">Resume</th>
                        <th className="px-4 py-3">Why Hire?</th>
                        <th className="px-4 py-3">Actions</th>
                        <th className="px-4 py-3">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRows.map((candidate) => (
                        <tr key={candidate._id} className="align-top">
                          <td className="px-4 py-4 text-sm text-slate-700">{candidate.firstName}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{candidate.lastName}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{candidate.email}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{candidate.phone}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{candidate.currentLocation}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{candidate.roleAppliedFor}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{candidate.totalExperience}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">
                            {candidate.currentCompany || 'N/A'}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-700">{candidate.currentSalary}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{candidate.expectedSalary}</td>
                          <td className="px-4 py-4">
                            {candidate.resumeLink ? (
                              <a
                                href={candidate.resumeLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-lg shadow-teal-200"
                              >
                                Open
                              </a>
                            ) : (
                              <span className="text-sm text-slate-500">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => openMessage(candidate.whyShouldWeHireYou)}
                              className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-lg shadow-teal-200"
                            >
                              View
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-2 min-w-[140px]">
                              <select
                                value=""
                                onChange={(e) =>
                                  requestStatusChange(
                                    candidate._id,
                                    e.target.value as JobCandidateStatus,
                                  )
                                }
                                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-700"
                                disabled={actionLoading === candidate._id}
                              >
                                <option value="" disabled>
                                  Change Status
                                </option>
                                {STATUS_TABS.filter((tab) => tab.key !== candidate.status).map((option) => (
                                  <option key={option.key} value={option.key}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => requestDelete(candidate._id)}
                              className="inline-flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              disabled={actionLoading === candidate._id}
                              aria-label="Delete candidate"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={isStatusConfirmOpen}
        title="Change candidate status?"
        message="This will move the candidate to a different status."
        confirmLabel="Yes, update"
        cancelLabel="No, keep"
        onConfirm={confirmStatusChange}
        onCancel={cancelStatusChange}
        isLoading={Boolean(actionLoading)}
      />

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        title="Delete candidate?"
        message="This will permanently delete the candidate record."
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isLoading={Boolean(actionLoading)}
      />

      <ConfirmDialog
        open={isMessageOpen}
        title="Why should we hire you?"
        message={messageContent}
        confirmLabel="Close"
        hideCancel={true}
        onConfirm={closeMessage}
        onCancel={closeMessage}
        isLoading={false}
      />
    </div>
  );
};

export default CandidateInfoView;
