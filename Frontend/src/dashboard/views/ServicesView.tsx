import React, { useEffect, useState } from 'react';
import { ICONS } from '../constants';
import { useServiceManagement } from '../hooks/useServiceManagement';
import { ServiceList } from '../components/service/ServiceList';
import { ServiceForm } from '../components/service/ServiceForm';
import type { BackendService } from '../types';
import ConfirmDialog from '../../components/layout/confirm-dialog';

const ServicesView: React.FC = () => {
  const {
    services,
    isLoading,
    fetchServices,
    deleteService,
    createService,
    updateService,
  } = useServiceManagement();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<BackendService | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<BackendService | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleCreate = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: BackendService) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDeleteRequest = (service: BackendService) => {
    setServiceToDelete(service);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    setIsDeleting(true);
    try {
      await deleteService(serviceToDelete.id);
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setServiceToDelete(null);
    }
  };

  const handleFormSubmit = async (data: FormData, isEdit: boolean, id?: number) => {
    if (isEdit && id) {
      await updateService(id, data);
      return;
    }
    await createService(data);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Services Library</h2>
          <p className="text-slate-500 text-sm font-medium">
            Manage your validation and compliance service offerings.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20 flex items-center gap-2 w-fit"
        >
          <ICONS.Plus size={18} /> Create New Service
        </button>
      </div>

      <ServiceList
        services={services}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={(id) => {
          const service = services.find((s) => s.id === id) || null;
          if (service) handleDeleteRequest(service);
        }}
      />

      <ServiceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingService}
        totalServices={services.length}
      />

      <ConfirmDialog
        open={isConfirmOpen}
        title="Delete service?"
        message={
          serviceToDelete
            ? `This will permanently delete "${serviceToDelete.title}".`
            : 'This action cannot be undone.'
        }
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (isDeleting) return;
          setIsConfirmOpen(false);
          setServiceToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ServicesView;
