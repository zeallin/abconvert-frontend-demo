export const Footer = () => {
  return (
    <footer className="bg-black text-gray text-center py-6 w-full">
      <p>© {new Date().getFullYear()} CinemaPosters. All rights reserved.</p>
      <nav className="mt-4">
        <a href="/about" className="text-gray hover:underline mx-2">
          About
        </a>
        |
        <a href="/contact" className="text-gray hover:underline mx-2">
          Contact
        </a>
        |
        <a href="/privacy" className="text-gray hover:underline mx-2">
          Privacy Policy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
