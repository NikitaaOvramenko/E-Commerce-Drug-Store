import { Link } from "react-router-dom";

type props = {
  width: string | number;
};

export default function Sidebar({ width }: props) {
  return (
    <aside
      className="sidebar h-full flex flex-col bg-white border-r border-gray-200"
      style={{ width: width }}
    >
      <div className="logo p-6 border-b border-gray-200 flex items-center justify-center font-bold text-xl text-gray-800 bg-gray-50">
        LOGO
      </div>

      <section className="w-full px-4 py-6 flex flex-col flex-1">
        <p className="name font-semibold text-gray-700 mb-4 px-2">Main</p>
        <ul className="space-y-2 flex flex-col">
          <li>
            <Link
              to={"/dashboard/store"}
              className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:text-blue-700 transition"
            >
              Store
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/basket"}
              className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:text-blue-700 transition"
            >
              Basket
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/settings"}
              className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:text-blue-700 transition"
            >
              Settings
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
}
