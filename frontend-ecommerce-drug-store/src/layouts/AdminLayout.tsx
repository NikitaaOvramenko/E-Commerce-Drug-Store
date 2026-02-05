import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Package, Tags, Building2, FolderTree, ArrowLeft, LogOut } from "lucide-react";
import { useTelegramTheme } from "../hooks/useTelegramTheme";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/admin/drugs", icon: Package, label: "Drugs" },
  { to: "/admin/types", icon: Tags, label: "Types" },
  { to: "/admin/brands", icon: Building2, label: "Brands" },
  { to: "/admin/categories", icon: FolderTree, label: "Categories" },
];

export default function AdminLayout() {
  const { bgColor, secondaryBgColor, textColor, hintColor, buttonColor } = useTelegramTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleBackToStore = () => {
    navigate("/store");
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: bgColor }}>
      {/* Sidebar */}
      <aside
        className="w-64 flex flex-col border-r"
        style={{ backgroundColor: secondaryBgColor, borderColor: `${hintColor}30` }}
      >
        {/* Header */}
        <div className="p-4 border-b" style={{ borderColor: `${hintColor}30` }}>
          <h1 className="text-xl font-bold" style={{ color: textColor }}>
            Admin Panel
          </h1>
          <p className="text-sm mt-1" style={{ color: hintColor }}>
            Inventory Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? "font-medium" : ""
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? buttonColor : "transparent",
                color: isActive ? bgColor : textColor,
              })}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 space-y-2 border-t" style={{ borderColor: `${hintColor}30` }}>
          <button
            onClick={handleBackToStore}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-colors"
            style={{ color: hintColor }}
          >
            <ArrowLeft size={20} />
            <span>Back to Store</span>
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-colors"
            style={{ color: "#ef4444" }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
