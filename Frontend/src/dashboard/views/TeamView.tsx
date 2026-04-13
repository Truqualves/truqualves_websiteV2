import React, { useEffect, useState } from 'react';
import { ICONS } from '../constants';
import { useTeamManagement } from '../hooks/useTeamManagement';
import { TeamList } from '../components/team/TeamList';
import { TeamForm } from '../components/team/TeamForm';
import type { BackendTeamMember } from '../types';
import ConfirmDialog from '../../components/layout/confirm-dialog';

const TeamView: React.FC = () => {
  const {
    teamMembers,
    isLoading,
    fetchTeamMembers,
    deleteTeamMember,
    createTeamMember,
    updateTeamMember,
  } = useTeamManagement();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<BackendTeamMember | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [teamMemberToDelete, setTeamMemberToDelete] = useState<BackendTeamMember | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleCreate = () => {
    setEditingTeamMember(null);
    setIsFormOpen(true);
  };

  const handleEdit = (teamMember: BackendTeamMember) => {
    setEditingTeamMember(teamMember);
    setIsFormOpen(true);
  };

  const handleDeleteRequest = (teamMember: BackendTeamMember) => {
    setTeamMemberToDelete(teamMember);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!teamMemberToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTeamMember(teamMemberToDelete._id);
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setTeamMemberToDelete(null);
    }
  };

  const handleFormSubmit = async (data: FormData, isEdit: boolean, id?: string) => {
    if (isEdit && id) {
      await updateTeamMember(id, data);
      return;
    }
    await createTeamMember(data);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Team Library</h2>
          <p className="text-slate-500 text-sm font-medium">
            Manage leadership and expert profiles for the About page.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20 flex items-center gap-2 w-fit"
        >
          <ICONS.Plus size={18} /> Add Team Member
        </button>
      </div>

      <TeamList
        teamMembers={teamMembers}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={(id) => {
          const teamMember = teamMembers.find((item) => item._id === id) || null;
          if (teamMember) {
            handleDeleteRequest(teamMember);
          }
        }}
      />

      <TeamForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTeamMember}
      />

      <ConfirmDialog
        open={isConfirmOpen}
        title="Delete team member?"
        message={
          teamMemberToDelete
            ? `This will permanently delete "${teamMemberToDelete.name}".`
            : 'This action cannot be undone.'
        }
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (isDeleting) return;
          setIsConfirmOpen(false);
          setTeamMemberToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default TeamView;
