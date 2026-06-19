import React from 'react';

// Pages
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Projects from '../pages/Projects.jsx';
import Skills from '../pages/Skills.jsx';
import Contact from '../pages/Contact.jsx';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin.jsx';
import AdminProjects from '../pages/admin/AdminProjects.jsx';
import ProjectForm from '../pages/admin/ProjectForm.jsx';

/**
 * Route configuration — single source of truth for all routes.
 * Used by App.jsx to render Route elements inside the layout.
 */
export const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/projects', element: <Projects /> },
  { path: '/skills', element: <Skills /> },
  { path: '/contact', element: <Contact /> },
  { path: '*', element: <Home /> },
];

/**
 * Admin routes — hidden, not linked from public nav.
 * Login page is unprotected; all others require authentication.
 */
export const adminRoutes = [
  { path: '/admin/login', element: <AdminLogin />, protected: false },
  { path: '/admin/projects', element: <AdminProjects />, protected: true },
  { path: '/admin/projects/new', element: <ProjectForm />, protected: true },
  { path: '/admin/projects/edit/:id', element: <ProjectForm />, protected: true },
];
