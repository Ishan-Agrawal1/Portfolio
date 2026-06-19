import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import AppLayout from './components/layout/AppLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { routes, adminRoutes } from './routes/AppRoutes.jsx';
import { apiClient } from './lib/api.js';
import { default as Contact } from './pages/Contact.jsx';
import { default as Projects } from './pages/Projects.jsx';

import './index.css';

function AnimatedOutlet({ projects, loading, contactProps }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <Routes location={location}>
          {routes.map(({ path, element }) => {
            let finalElement = element;
            if (path === '/projects') {
              finalElement = <Projects projects={projects} loading={loading} />;
            } else if (path === '/contact') {
              finalElement = <Contact {...contactProps} />;
            }
            return <Route key={path} path={path} element={finalElement} />;
          })}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactError, setContactError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/projects');
      setProjects(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setContactError('All fields are required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setContactError('Invalid email address');
      return false;
    }
    setContactError(null);
    return true;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setContactLoading(true);
    try {
      const response = await apiClient.post('/contacts', formData);
      console.log('Form submitted successfully:', response);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Form submission error:', err);
      setContactError(err.message || 'Failed to submit form');
    } finally {
      setContactLoading(false);
    }
  };

  const contactProps = {
    formData,
    loading: contactLoading,
    submitted,
    error: contactError,
    onInputChange: handleInputChange,
    onSubmit: handleFormSubmit,
  };

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Render admin routes without AppLayout
  if (isAdminRoute) {
    return (
      <Routes>
        {adminRoutes.map(({ path, element, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute>{element}</ProtectedRoute>
              ) : (
                element
              )
            }
          />
        ))}
      </Routes>
    );
  }

  // Render public routes with AppLayout
  return (
    <AppLayout>
      <AnimatedOutlet projects={projects} loading={loading} contactProps={contactProps} />
    </AppLayout>
  );
}
