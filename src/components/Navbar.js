import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-ink bg-paper sticky top-0 z-10 border-b border-line">
      <p className="w-full text-3xl font-bold text-ink m-4">
        TOMAS FERRARI
      </p>
      <ul className="hidden md:flex font-mono text-sm">
        <li className="p-4 hover:text-rust hover:underline"><a href="#About">About</a></li>
        <li className="p-4 hover:text-rust hover:underline"><a href="#Experience">Experience</a></li>
        <li className="p-4 hover:text-rust hover:underline"><a href="#Apps">Apps</a></li>
        <li className="p-4 hover:text-rust hover:underline"><a href="#Skills">Skills</a></li>
        <li className="p-4 hover:text-rust hover:underline"><a href="#Contact">Contact</a></li>
      </ul>
      <div className="block md:hidden text-ink" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          isMobileMenuOpen
            ? "fixed left-0 top-0 w-[70%] h-full border-r border-line bg-paper ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <p className="w-full text-3xl font-bold text-ink m-4">
          Tomas Ferrari
        </p>
        <ul className="pt-4 font-mono text-sm">
          <li className="p-4 hover:text-rust border-b border-line"><a onClick={toggleMobileMenu} href="#About">About</a></li>
          <li className="p-4 hover:text-rust border-b border-line"><a onClick={toggleMobileMenu} href="#Experience">Experience</a></li>
          <li className="p-4 hover:text-rust border-b border-line"><a onClick={toggleMobileMenu} href="#Apps">Apps</a></li>
          <li className="p-4 hover:text-rust border-b border-line"><a onClick={toggleMobileMenu} href="#Skills">Skills</a></li>
          <li className="p-4 hover:text-rust"><a onClick={toggleMobileMenu} href="#Contact">Contact</a></li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
