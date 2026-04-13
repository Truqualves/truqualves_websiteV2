import React, { useState, useEffect } from 'react';
import { ICONS } from '../../constants';
import type { BackendBlog } from '../../types';
import axios from 'axios';

interface BlogFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData, isEdit: boolean, id?: number) => Promise<void>;
    initialData?: BackendBlog | null;
}

export const BlogForm: React.FC<BlogFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        introduction: '',
        keyTakeaways: '',
        elaborated: '',
        quote: '',
        conclusion: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    title: initialData.title,
                    description: initialData.description,
                    author: initialData.author,
                    date: initialData.date,
                    category: initialData.category?.join(', ') || '',
                    introduction: initialData.contentBody?.introduction || '',
                    keyTakeaways: initialData.contentBody?.keyTakeaways?.join('\n') || '',
                    elaborated: initialData.contentBody?.elaborated || '',
                    quote: initialData.contentBody?.quote || '',
                    conclusion: initialData.contentBody?.conclusion || ''
                });
                setExistingImage(initialData.image);
            } else {
                // Reset form
                setFormData({
                    title: '', description: '', author: '', date: new Date().toISOString().split('T')[0],
                    category: '', introduction: '', keyTakeaways: '', elaborated: '', quote: '', conclusion: ''
                });
                setImageFile(null);
                setExistingImage(null);
            }
            setFormError('');
        }
    }, [isOpen, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            
            // Handle ID: Use existing editing ID or generate a new one
            const blogId = initialData ? initialData.id : Math.floor(Math.random() * 1000000);
            
            data.append('id', blogId.toString());
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('author', formData.author);
            data.append('date', formData.date);
            
            // Process categories
            const cats = formData.category.split(',').map(c => c.trim()).filter(c => c);
            cats.forEach(c => data.append('category[]', c));

            if (imageFile) {
                data.append('image', imageFile);
            } else if (initialData && existingImage) {
                data.append('image', existingImage);
            } else {
                data.append('image', 'https://via.placeholder.com/800x400');
            }

            // Structure contentBody
            const contentBody = {
                introduction: formData.introduction,
                keyTakeaways: formData.keyTakeaways.split('\n').filter(k => k.trim()),
                elaborated: formData.elaborated,
                quote: formData.quote,
                conclusion: formData.conclusion
            };
            
            data.append('contentBody[introduction]', contentBody.introduction);
            data.append('contentBody[elaborated]', contentBody.elaborated);
            data.append('contentBody[quote]', contentBody.quote);
            data.append('contentBody[conclusion]', contentBody.conclusion);
            contentBody.keyTakeaways.forEach((kt, i) => {
                data.append(`contentBody[keyTakeaways][${i}]`, kt);
            });

            await onSubmit(data, !!initialData, initialData?.id);
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
                <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 transition-transform">
                    <h3 className="text-xl font-bold text-slate-800">{initialData ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                        <ICONS.X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {formError && (
                        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                            {formError}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Title</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Author</label>
                            <input type="text" name="author" required value={formData.author} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Description (Excerpt)</label>
                        <textarea name="description" required rows={3} value={formData.description} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Date</label>
                            <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Categories (comma separated)</label>
                            <input type="text" name="category" placeholder="e.g. Compliance, FDA, Quality" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Cover Image</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className="flex flex-col items-center gap-2 text-slate-500">
                                <ICONS.FileText size={24} />
                                <span className="text-sm font-medium">{imageFile ? imageFile.name : (existingImage ? 'Keep Current Image' : 'Click to upload image')}</span>
                                {!imageFile && existingImage && <span className="text-[10px] text-teal-600 truncate max-w-[200px]">{existingImage}</span>}
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-100" />
                    <h4 className="font-bold text-slate-800">Article Content</h4>

                        <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Introduction</label>
                        <textarea name="introduction" rows={4} value={formData.introduction} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Key Takeaways (one per line)</label>
                        <textarea name="keyTakeaways" rows={4} value={formData.keyTakeaways} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"></textarea>
                    </div>

                        <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Main Content (Elaborated)</label>
                        <textarea name="elaborated" rows={8} value={formData.elaborated} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"></textarea>
                    </div>

                        <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Quote</label>
                        <textarea name="quote" rows={2} value={formData.quote} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none italic"></textarea>
                    </div>
                    
                        <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Conclusion</label>
                        <textarea name="conclusion" rows={3} value={formData.conclusion} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all">Cancel</button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    {initialData ? 'Updating...' : 'Saving...'}
                                </>
                            ) : (initialData ? 'Update Post' : 'Publish Post')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
