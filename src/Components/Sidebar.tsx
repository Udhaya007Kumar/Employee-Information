import { Home, Users, PlusCircle, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: <Home size={18} />, path: "/" },
  { label: "Employees", icon: <Users size={18} />, path: "/employees" },
  { label: "Add Employee", icon: <PlusCircle size={18} />, path: "/add-employee" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 fixed top-4 left-4 z-50 bg-white rounded-lg shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white p-4 shadow-md transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                 ${
                   isActive
                     ? "bg-indigo-100 text-indigo-700"
                     : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                 }`
              }
              onClick={() => setIsOpen(false)} // Close on mobile after click
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
