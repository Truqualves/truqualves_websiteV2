
import React from 'react';
import type { BlogPost } from '../../types';
import { ICONS } from '../../constants';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-teal-600 uppercase tracking-widest shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span className="font-medium text-slate-500">{post.author}</span>
          <span>•</span>
          <span>{post.publishDate}</span>
        </div>
        
        <h3 className="font-bold text-base text-slate-800 mb-3 line-clamp-2 leading-tight group-hover:text-teal-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-slate-500 text-xs line-clamp-3 mb-6 flex-1">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <button className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1 group/btn">
            Read More 
            <ICONS.ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
          
          <div className="flex gap-1">
            <button title="Edit" className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
              <ICONS.FileText size={16} />
            </button>
            <button title="Delete" className="p-2 hover:bg-rose-50 rounded-lg text-rose-400 transition-colors">
              <ICONS.Activity size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
