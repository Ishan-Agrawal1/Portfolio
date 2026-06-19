import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft, Save, Upload, X, Plus, Film, Image as ImageIcon,
  AlertCircle, CheckCircle, Loader2, Trash2
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const CATEGORIES = ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Blockchain'];

const EMPTY_FORM = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  githubUrl: '',
  liveUrl: '',
  category: '',
  featured: false,
  techStack: [],
  features: [],
  thumbnail: '',
  demoVideo: '',
};

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { authFetch } = useAuth();

  const [form, setForm] = useState(EMPTY_FORM);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const videoInputRef = useRef(null);
  const thumbInputRef = useRef(null);

  // Fetch project data for edit mode
  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchProject = async () => {
    try {
      const data = await authFetch(`/admin/projects/${id}`);
      const p = data.data;
      setForm({
        title: p.title || '',
        shortDescription: p.shortDescription || '',
        fullDescription: p.fullDescription || '',
        githubUrl: p.githubUrl || '',
        liveUrl: p.liveUrl || '',
        category: p.category || '',
        featured: p.featured || false,
        techStack: p.techStack || [],
        features: p.features || [],
        thumbnail: p.thumbnail || '',
        demoVideo: p.demoVideo || '',
      });
      if (p.thumbnail) setThumbPreview(p.thumbnail);
      if (p.demoVideo) setVideoPreview(p.demoVideo);
    } catch (err) {
      setError(err.message);
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Video file handling
  const handleVideoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    handleChange('demoVideo', '');
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  // Thumbnail file handling
  const handleThumbnailSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbPreview(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbPreview(null);
    handleChange('thumbnail', '');
    if (thumbInputRef.current) thumbInputRef.current.value = '';
  };

  // Tech stack tag management
  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !form.techStack.includes(trimmed)) {
      handleChange('techStack', [...form.techStack, trimmed]);
      setTechInput('');
    }
  };

  const removeTech = (tech) => {
    handleChange('techStack', form.techStack.filter((t) => t !== tech));
  };

  // Features list management
  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !form.features.includes(trimmed)) {
      handleChange('features', [...form.features, trimmed]);
      setFeatureInput('');
    }
  };

  const removeFeature = (feature) => {
    handleChange('features', form.features.filter((f) => f !== feature));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title.trim()) {
      setError('Project title is required.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Text fields
      formData.append('title', form.title);
      formData.append('shortDescription', form.shortDescription);
      formData.append('fullDescription', form.fullDescription);
      formData.append('githubUrl', form.githubUrl);
      formData.append('liveUrl', form.liveUrl);
      formData.append('category', form.category);
      formData.append('featured', form.featured.toString());
      formData.append('techStack', form.techStack.join(','));
      formData.append('features', form.features.join(','));

      // Files
      if (videoFile) {
        formData.append('demoVideoFile', videoFile);
      }
      if (thumbnailFile) {
        formData.append('thumbnailFile', thumbnailFile);
      }

      const endpoint = isEdit ? `/admin/projects/${id}` : '/admin/projects';
      const method = isEdit ? 'PUT' : 'POST';

      await authFetch(endpoint, {
        method,
        body: formData,
      });

      setToast({
        type: 'success',
        message: isEdit ? 'Project updated successfully!' : 'Project created successfully!',
      });

      // Navigate back after short delay
      setTimeout(() => navigate('/admin/projects'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-32">
          <Loader2 size={24} className="text-[#e9c176] animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          className={`fixed top-20 left-1/2 z-[100] flex items-center gap-2 px-5 py-3 rounded-lg border text-sm shadow-xl ${
            toast.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{toast.message}</span>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/projects')}
          className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">
            {isEdit ? 'Edit Project' : 'New Project'}
          </h1>
          <p className="text-sm text-gray-500">
            {isEdit ? 'Update project details and media' : 'Add a new project to your portfolio'}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto hover:opacity-70">
            <X size={14} />
          </button>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column — Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="border border-white/8 rounded-xl bg-[#111111]/60 p-6 space-y-5">
              <h2 className="text-sm font-mono tracking-widest uppercase text-gray-400">
                Basic Information
              </h2>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  Title *
                </label>
                <input
                  id="project-title"
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                  placeholder="My Awesome Project"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 focus:ring-1 focus:ring-[#e9c176]/20 transition-all"
                />
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  Short Description
                </label>
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => handleChange('shortDescription', e.target.value)}
                  placeholder="A brief one-liner about the project"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 focus:ring-1 focus:ring-[#e9c176]/20 transition-all"
                />
              </div>

              {/* Full Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  Full Description
                </label>
                <textarea
                  value={form.fullDescription}
                  onChange={(e) => handleChange('fullDescription', e.target.value)}
                  placeholder="Detailed description of the project, its goals, and implementation..."
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 focus:ring-1 focus:ring-[#e9c176]/20 transition-all resize-none"
                />
              </div>
            </div>

            {/* Media Card */}
            <div className="border border-white/8 rounded-xl bg-[#111111]/60 p-6 space-y-5">
              <h2 className="text-sm font-mono tracking-widest uppercase text-gray-400">
                Media
              </h2>

              {/* Thumbnail Upload */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  Thumbnail Image
                </label>
                {thumbPreview ? (
                  <div className="relative rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={thumbPreview}
                      alt="Thumbnail preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-red-400 hover:bg-black/80 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => thumbInputRef.current?.click()}
                    className="w-full h-36 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-[#e9c176]/30 hover:text-[#e9c176] transition-all cursor-pointer group"
                  >
                    <ImageIcon size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono tracking-wider">Click to upload thumbnail</span>
                    <span className="text-[10px] text-gray-600">JPEG, PNG, WebP</span>
                  </button>
                )}
                <input
                  ref={thumbInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailSelect}
                  className="hidden"
                />
              </div>

              {/* Video Upload */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  Demo Video
                </label>
                {videoPreview ? (
                  <div className="relative rounded-lg overflow-hidden border border-white/10">
                    <video
                      src={videoPreview}
                      className="w-full h-48 object-cover bg-black"
                      controls
                      muted
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-red-400 hover:bg-black/80 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="w-full h-36 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-[#e9c176]/30 hover:text-[#e9c176] transition-all cursor-pointer group"
                  >
                    <Film size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono tracking-wider">Click to upload demo video</span>
                    <span className="text-[10px] text-gray-600">MP4, WebM, MOV (max 100MB)</span>
                  </button>
                )}
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="hidden"
                />
                {videoFile && (
                  <p className="text-[10px] text-gray-500 font-mono">
                    Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
                  </p>
                )}
              </div>
            </div>

            {/* Tech Stack & Features */}
            <div className="border border-white/8 rounded-xl bg-[#111111]/60 p-6 space-y-5">
              <h2 className="text-sm font-mono tracking-widest uppercase text-gray-400">
                Tech Stack & Features
              </h2>

              {/* Tech Stack */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  Tech Stack
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTech();
                      }
                    }}
                    placeholder="e.g. React, Node.js..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-[#e9c176] hover:border-[#e9c176]/30 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {form.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-[#e9c176]/10 text-[#e9c176] border border-[#e9c176]/20"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTech(tech)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  Key Features
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    placeholder="e.g. Real-time chat, OAuth2..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-[#e9c176] hover:border-[#e9c176]/30 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {form.features.length > 0 && (
                  <div className="space-y-1.5 mt-2">
                    {form.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5 text-sm text-gray-300"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e9c176]/60" />
                          {feature}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="text-gray-600 hover:text-red-400 transition-colors shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column — Sidebar */}
          <div className="space-y-6">
            {/* Links Card */}
            <div className="border border-white/8 rounded-xl bg-[#111111]/60 p-6 space-y-5">
              <h2 className="text-sm font-mono tracking-widest uppercase text-gray-400">
                Links
              </h2>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={form.githubUrl}
                  onChange={(e) => handleChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  Live URL
                </label>
                <input
                  type="url"
                  value={form.liveUrl}
                  onChange={(e) => handleChange('liveUrl', e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 transition-all"
                />
              </div>
            </div>

            {/* Settings Card */}
            <div className="border border-white/8 rounded-xl bg-[#111111]/60 p-6 space-y-5">
              <h2 className="text-sm font-mono tracking-widest uppercase text-gray-400">
                Settings
              </h2>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e9c176]/50 transition-all cursor-pointer"
                >
                  <option value="" className="bg-[#1a1a1a]">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#1a1a1a]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-500">
                  Featured
                </label>
                <button
                  type="button"
                  onClick={() => handleChange('featured', !form.featured)}
                  className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                    form.featured ? 'bg-[#e9c176]' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                      form.featured ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="save-project-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-mono text-[11px] tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-[#e9c176] text-black font-semibold hover:bg-[#d4a956] shadow-lg shadow-[#e9c176]/10 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {videoFile || thumbnailFile ? 'Uploading Media...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save size={16} />
                  {isEdit ? 'Update Project' : 'Create Project'}
                </>
              )}
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="w-full py-3 rounded-xl font-mono text-[11px] tracking-widest uppercase border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
