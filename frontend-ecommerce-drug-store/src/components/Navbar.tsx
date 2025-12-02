export default function Navbar() {
  return (
    <header className="header flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      <div className="search flex items-center flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search drugs, brands..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="account ml-4 flex items-center text-gray-700">
        <button className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition">
          Account
        </button>
      </div>
    </header>
  );
}
