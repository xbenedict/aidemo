
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 shadow-xl">
      <div className="container mx-auto flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mr-3 text-sky-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 00-3.09 3.09zM18.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L24 5.25l-.813 2.846a4.5 4.5 0 00-3.09 3.09l-2.846.813.813 2.846a4.5 4.5 0 003.09 3.09L24 18.75l-2.846-.813a4.5 4.5 0 00-3.09-3.09L15 12l2.846-.813a4.5 4.5 0 003.09-3.09L21.75 5.25l-.813 2.846a4.5 4.5 0 00-3.09 3.09l-2.846.813z" />
        </svg>
        <h1 className="text-3xl font-bold tracking-tight">Catalyst AI</h1>
      </div>
    </header>
  );
};

export default Header;
