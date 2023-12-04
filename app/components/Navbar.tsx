"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "../types/navbarTypes";

const Navbar = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  const navLinks: NavLink[] = [
    { name: "Home", nav: "/", id: 1 },
    { name: "Quizzes", nav: "/quizzes", id: 2 },
    { name: "Account", nav: "/profile", id: 3 },
  ];

  return (
    <nav className="bg-black h-36 sticky sm:px-16 px-6 w-full flex items-center py-5 top-0 font-black z-20">
      <div className="w-full flex justify-between items-center  mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Holistic health logo"
            className="w-32 h-32 object-contain cursor-pointer"
            priority={true}
          />
        </Link>
        <ul className=" list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                pathname === link.nav
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500"
                  : "text-white"
              } text-2xl md:text-3xl font-bold cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-custom-green hover:to-custom-blue`}
            >
              <Link href={link.nav}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center z-10">
          <motion.button
            className="block sm:hidden text-white cursor-pointer "
            aria-label="Toggle Mobile Menu"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <AiOutlineClose size={38} />
            ) : (
              <AiOutlineMenu size={38} />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className=" sm:hidden fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-5"
          >
            <ul className="list-none space-y-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, translateX: -200 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.38,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className={`${
                    pathname === link.nav
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500"
                      : "text-white"
                  }   hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-custom-green hover:to-custom-blue text-5xl font-bold cursor-pointer pb-2`}
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <Link href={link.nav}>{link.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
