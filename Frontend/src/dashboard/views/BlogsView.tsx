import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';
import { useBlogManagement } from '../hooks/useBlogManagement';
import { BlogList } from '../components/blog/BlogList';
import { BlogForm } from '../components/blog/BlogForm';
import type { BackendBlog } from '../types';
import ConfirmDialog from '../../components/layout/confirm-dialog';

const BlogsView: React.FC = () => {
    const { 
        blogs, 
        isLoading, 
        fetchBlogs, 
        deleteBlog, 
        createBlog, 
        updateBlog 
    } = useBlogManagement();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BackendBlog | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<BackendBlog | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const handleCreate = () => {
        setEditingBlog(null);
        setIsFormOpen(true);
    };

    const handleEdit = (blog: BackendBlog) => {
        setEditingBlog(blog);
        setIsFormOpen(true);
    };

    const handleDeleteRequest = (blog: BackendBlog) => {
        setBlogToDelete(blog);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!blogToDelete) return;
        setIsDeleting(true);
        try {
            await deleteBlog(blogToDelete.id);
        } finally {
            setIsDeleting(false);
            setIsConfirmOpen(false);
            setBlogToDelete(null);
        }
    };

    const handleFormSubmit = async (data: FormData, isEdit: boolean, id?: number) => {
        if (isEdit && id) {
            await updateBlog(id, data);
        } else {
            await createBlog(data);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-800">Blogs Library</h2>
                    <p className="text-slate-500 text-sm font-medium">Manage your blog posts and articles.</p>
                </div>
                <button 
                    onClick={handleCreate}
                    className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20 flex items-center gap-2 w-fit"
                >
                    <ICONS.Plus size={18} /> Create New Post
                </button>
            </div>

            {/* Blog List Grid */}
            <BlogList 
                blogs={blogs} 
                isLoading={isLoading} 
                onEdit={handleEdit} 
                onDelete={(id) => {
                    const blog = blogs.find((b) => b.id === id) || null;
                    if (blog) {
                        handleDeleteRequest(blog);
                    }
                }} 
            />

            {/* Modal Form Overlay */}
            <BlogForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleFormSubmit}
                initialData={editingBlog}
            />

            <ConfirmDialog
                open={isConfirmOpen}
                title="Delete blog post?"
                message={blogToDelete ? `This will permanently delete "${blogToDelete.title}".` : "This action cannot be undone."}
                confirmLabel="Yes, delete"
                cancelLabel="No, keep"
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    if (isDeleting) return;
                    setIsConfirmOpen(false);
                    setBlogToDelete(null);
                }}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default BlogsView;
