export default function Footer() {
  return (
    <footer className="footer bg-gray-100 text-gray-700 py-6 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} E-Commerce Drug Store. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
