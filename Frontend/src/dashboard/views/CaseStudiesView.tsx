import React, { useEffect, useState } from 'react';
import { ICONS } from '../constants';
import { useCaseStudyManagement } from '../hooks/useCaseStudyManagement';
import { CaseStudyList } from '../components/case-study/CaseStudyList';
import { CaseStudyForm } from '../components/case-study/CaseStudyForm';
import type { BackendCaseStudy } from '../types';
import ConfirmDialog from '../../components/layout/confirm-dialog';

const CaseStudiesView: React.FC = () => {
  const {
    caseStudies,
    isLoading,
    fetchCaseStudies,
    deleteCaseStudy,
    createCaseStudy,
    updateCaseStudy,
  } = useCaseStudyManagement();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<BackendCaseStudy | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [caseStudyToDelete, setCaseStudyToDelete] = useState<BackendCaseStudy | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  const handleCreate = () => {
    setEditingCaseStudy(null);
    setIsFormOpen(true);
  };

  const handleEdit = (caseStudy: BackendCaseStudy) => {
    setEditingCaseStudy(caseStudy);
    setIsFormOpen(true);
  };

  const handleDeleteRequest = (caseStudy: BackendCaseStudy) => {
    setCaseStudyToDelete(caseStudy);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!caseStudyToDelete) return;
    setIsDeleting(true);
    try {
      await deleteCaseStudy(caseStudyToDelete._id);
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setCaseStudyToDelete(null);
    }
  };

  const handleFormSubmit = async (
    data: Omit<BackendCaseStudy, '_id'>,
    isEdit: boolean,
    id?: string,
  ) => {
    if (isEdit && id) {
      await updateCaseStudy(id, data);
      return;
    }
    await createCaseStudy(data);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Case Studies Library</h2>
          <p className="text-slate-500 text-sm font-medium">
            Manage your case studies without extra fields or overhead.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20 flex items-center gap-2 w-fit"
        >
          <ICONS.Plus size={18} /> Create New Case Study
        </button>
      </div>

      <CaseStudyList
        caseStudies={caseStudies}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={(id) => {
          const caseStudy = caseStudies.find((item) => item._id === id) || null;
          if (caseStudy) {
            handleDeleteRequest(caseStudy);
          }
        }}
      />

      <CaseStudyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCaseStudy}
      />

      <ConfirmDialog
        open={isConfirmOpen}
        title="Delete case study?"
        message={
          caseStudyToDelete
            ? `This will permanently delete "${caseStudyToDelete.title}".`
            : 'This action cannot be undone.'
        }
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (isDeleting) return;
          setIsConfirmOpen(false);
          setCaseStudyToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CaseStudiesView;
