import { useLang } from "@/context/LangContext";
import { useTelegramTheme } from "@/hooks/useTelegramTheme";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Package } from "lucide-react";
import { translations } from "@/i18n/translations";

const navItems = [
  { id: 1, link: "/store", icon: Home },
  { id: 2, link: "/favorites", icon: Heart },
  { id: 3, link: "/orders", icon: Package },
];

const Navbar = () => {
  const { language } = useLang();
  const { secondaryBgColor, hintColor, buttonColor } = useTelegramTheme();
  const location = useLocation();
  const t = translations[language];

  const labels = [t.navbar.home, t.navbar.favorites, t.navbar.orders];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center">
      <div
        className={`w-[90%] mb-2 rounded-3xl overflow-hidden backdrop-blur-xl bg-[${secondaryBgColor}] border`}
        style={{
          // backgroundColor: `${secondaryBgColor}cc`,
          borderColor: `${hintColor}30`,
        }}
      >
        <div className="flex items-stretch">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.link;
            const Icon = item.icon;
            return (
              <Link key={item.id} to={item.link} className="flex-1">
                <div
                  className="flex flex-col items-center gap-1 py-3 px-2 transition-colors"
                  style={{ color: isActive ? buttonColor : hintColor }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span className="text-xs font-medium leading-none">
                    {labels[i]}
                  </span>
                  {isActive && (
                    <div
                      className="w-1 h-1 rounded-full mt-0.5"
                      style={{ backgroundColor: buttonColor }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
