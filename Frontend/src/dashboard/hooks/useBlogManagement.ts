import { useState, useCallback } from 'react';
import axios from 'axios';
import type { BackendBlog } from '../types';

export const useBlogManagement = () => {
  const [blogs, setBlogs] = useState<BackendBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      setError("Error fetching blogs");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteBlog = useCallback(async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`);
      fetchBlogs(); // Refresh list
    } catch (err) {
      console.error("Error deleting blog:", err);
      // Optional: set error state
    }
  }, [fetchBlogs]);

  const createBlog = useCallback(async (data: FormData) => {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchBlogs();
  }, [fetchBlogs]);

  const updateBlog = useCallback(async (id: number, data: FormData) => {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    isLoading,
    error,
    fetchBlogs,
    deleteBlog,
    createBlog,
    updateBlog
  };
};
