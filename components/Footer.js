export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 px-4 flex flex-col md:flex-row justify-between items-center">
      <div>
        <span className="font-bold">STEM Village</span> &copy; {new Date().getFullYear()} Odisha
      </div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-blue-400"><i data-feather="facebook"></i></a>
        <a href="#" className="hover:text-blue-400"><i data-feather="twitter"></i></a>
        <a href="#" className="hover:text-blue-400"><i data-feather="instagram"></i></a>
      </div>
      <div className="text-sm mt-2 md:mt-0">
        <a href="/resources" className="hover:underline">Resources</a> | <a href="/about" className="hover:underline">About</a>
      </div>
    </footer>
  );
}
