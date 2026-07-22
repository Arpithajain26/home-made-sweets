import React from 'react';

/** Placeholder Header component (distinct from Navbar, e.g. for page hero banners) */
const Header: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <header className="bg-amber-900 text-amber-50 py-10 text-center">
    <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
    {subtitle && <p className="mt-2 text-amber-200 text-lg">{subtitle}</p>}
  </header>
);

export default Header;
