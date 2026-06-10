import React from 'react';

// Pages
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Projects from '../pages/Projects.jsx';
import Skills from '../pages/Skills.jsx';
import Contact from '../pages/Contact.jsx';

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
