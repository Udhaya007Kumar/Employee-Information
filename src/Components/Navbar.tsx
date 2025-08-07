import React from 'react';

const Navbar = () => {
    return (
        <nav className="w-full h-16 flex items-center justify-between bg-white px-6 shadow">
    {/* Logo + Brand */}
    <div className="flex items-center gap-3">
      <div className="bg-indigo-100 rounded-lg p-2 flex items-center justify-center">
        {/* Sample SVG Logo */}
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#6759FA" strokeWidth="2" fill="#EDEAFF" />
          <text x="12" y="16" fontSize="10" textAnchor="middle" fill="#6759FA" fontWeight="bold">AI</text>
        </svg>
      </div>
      <span className="font-bold text-lg text-gray-800">Aqxle</span>
    </div>

    {/* Search Box */}
    {/* <div className="flex-1 flex justify-center px-6">
      <input
        type="text"
        placeholder="Search here..."
        className="w-80 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-200 outline-none text-gray-700"
      />
    </div> */}

    {/* Right Side Icons */}
    <div className="flex items-center gap-5">
      {/* Language Dropdown */}
      <div className="flex items-center gap-1 text-gray-600 cursor-pointer">
        <span role="img" aria-label="USA">🇺🇸</span>
        <span className="text-sm">Eng (US)</span>
        <svg width="12" height="12"><path d="M2 4l4 4 4-4" stroke="#667085" strokeWidth="2" fill="none"/></svg>
      </div>

      {/* Notification Icon */}
      <button className="relative">
        <svg width="22" height="22" fill="none" stroke="#FFA726" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2H10a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 1 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 5.71 19h12.58a1 1 0 0 0 .7-1.71L18 16z"/>
        </svg>
        <span className="absolute top-0 right-0 block w-2 h-2 bg-orange-400 rounded-full"></span>
      </button>

      {/* User Avatar + Name */}
      <div className="flex items-center gap-2">
        <img
          src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 90)}.jpg`}
          alt="User"
          className="w-9 h-9 rounded-full object-cover border"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">Udhaya</span>
          <span className="text-xs text-gray-400">Admin</span>
        </div>
      </div>
    </div>
  </nav>
    );
};

export default Navbar;