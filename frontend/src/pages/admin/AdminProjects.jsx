import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Edit3, Trash2, ExternalLink, Github, Star, Search,
  Film, Image, AlertCircle, CheckCircle, X, ChevronDown
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const CATEGORIES = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'Blockchain'];

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const { authFetch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await authFetch('/admin/projects');
      setProjects(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await authFetch(`/admin/projects/${id}`, { method: 'DELETE' });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setToast({ type: 'success', message: 'Project deleted successfully.' });
      setDeleteModal(null);
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setDeleting(false);
    }
  };

  // Filter projects
  const filtered = projects.filter((p) => {
    const matchesSearch = !searchQuery || 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-20 left-1/2 z-[100] flex items-center gap-2 px-5 py-3 rounded-lg border text-sm shadow-xl ${
              toast.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          id="add-project-btn"
          onClick={() => navigate('/admin/projects/new')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#e9c176] text-black font-mono text-[11px] tracking-widest uppercase font-semibold hover:bg-[#d4a956] transition-all duration-300 shadow-lg shadow-[#e9c176]/10"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-[#e9c176]/50 transition-all cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-[#1a1a1a] text-white">
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-xl skeleton" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <AlertCircle size={40} className="mb-4 text-red-400" />
          <p className="text-red-400 mb-2">{error}</p>
          <button
            onClick={fetchProjects}
            className="text-[#e9c176] hover:underline text-sm"
          >
            Try again
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Film size={40} className="mb-4 opacity-40" />
          <p className="text-lg mb-1">
            {searchQuery || filterCategory !== 'All' ? 'No matching projects' : 'No projects yet'}
          </p>
          <p className="text-sm mb-6 text-gray-600">
            {searchQuery || filterCategory !== 'All' ? 'Try adjusting your filters' : 'Create your first project to get started.'}
          </p>
          {!searchQuery && filterCategory === 'All' && (
            <button
              onClick={() => navigate('/admin/projects/new')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#e9c176] text-black font-mono text-[11px] tracking-widest uppercase font-semibold hover:bg-[#d4a956] transition-all"
            >
              <Plus size={16} />
              Add Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative border border-white/8 rounded-xl bg-[#111111]/60 backdrop-blur-sm overflow-hidden hover:border-white/15 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-40 bg-[#0a0a0a] overflow-hidden">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image size={32} className="text-gray-700" />
                  </div>
                )}
                {/* Category badge */}
                {project.category && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-sm text-gray-300 border border-white/10">
                    {project.category}
                  </span>
                )}
                {/* Featured star */}
                {project.featured && (
                  <span className="absolute top-3 right-3">
                    <Star size={16} className="text-[#e9c176] fill-[#e9c176]" />
                  </span>
                )}
                {/* Video indicator */}
                {project.demoVideo && (
                  <span className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono bg-black/60 backdrop-blur-sm text-gray-300 border border-white/10">
                    <Film size={10} />
                    Video
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white truncate mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 min-h-[2rem]">
                  {project.shortDescription || 'No description'}
                </p>

                {/* Tech stack tags */}
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-white/5 text-gray-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-gray-500">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                      className="p-2 rounded-lg text-gray-500 hover:text-[#e9c176] hover:bg-[#e9c176]/10 transition-all"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteModal(project)}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-sm bg-[#141414] border border-white/10 rounded-xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Trash2 size={18} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Delete Project</h3>
                  <p className="text-gray-500 text-xs">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to delete{' '}
                <span className="text-white font-medium">"{deleteModal.title}"</span>?
                This will also remove all associated media from Cloudinary.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.id)}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-lg bg-red-500/20 border border-red-500/30 text-sm text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
