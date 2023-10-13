import React from 'react';

const MenuItem = ({ icon, title, action, isActive = null }) => {
  return (
    <button
      className={`p-3 m-2 font-semibold shadow-sm shadow-slate-900 hover:ring-2 ring-slate-200 ${
        isActive && isActive() ? 'bg-gray-300 text-black' : ''
      }`}
      onClick={action}
      title={title}
      type='button'
    >
      <i className={`ri-${icon}`}></i>
    </button>
  );
};

export default MenuItem;
