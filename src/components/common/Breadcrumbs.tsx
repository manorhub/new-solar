import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  const navigate = useNavigate();
  const handleNav = onNavigate || ((path: string) => navigate(path));

  return (
    <nav className="flex items-center text-xs font-semibold text-slate-500 py-3 no-print" aria-label="Breadcrumb">
      <button
        onClick={() => handleNav('/')}
        className="flex items-center gap-1 hover:text-amber-600 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1.5 flex-shrink-0" />
          {item.path ? (
            <button
              onClick={() => handleNav(item.path!)}
              className="hover:text-amber-600 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-slate-900 font-bold truncate max-w-xs">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
