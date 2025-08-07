
import { Home, Users, PlusCircle, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";



const navItems = [
  {
    label: "Dashboard",
    icon: <Home size={18} />,
    path: "/",
  },
  {
    label: "Employees",
    icon: <Users size={18} />,
    path: "/employees",
  },
  {
    label: "Add Employee",
    icon: <PlusCircle size={18} />,
    path: "/add-employee",
  },
  {
    label: "Reports",
    icon: <BarChart3 size={18} />,
    path: "/reports",
  },
];

const Sidebar = () => {
    return (
         <aside className="w-64 h-screen  bg-white p-4">
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
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
    );
};

export default Sidebar;