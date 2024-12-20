import '../index.css';
import Button from '../Components/Button';
import { FaBars, FaTimes } from 'react-icons/fa'; // Added close icon
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-extrabold text-[#AD343E]">
          Dine
        </a>

        {/* Hamburger Menu for Small Screens */}
        <div
          className="cursor-pointer text-2xl xs:block sm:block md:hidden lg:hidden xl:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaTimes className="text-[#AD343E]" />
          ) : (
            <FaBars className="text-[#AD343E]" />
          )}
        </div>

        {/* Navigation Links */}
        <section
          className={`xs:${isOpen ? 'block mx-auto text-center' : 'hidden'} sm:${
            isOpen ? 'block mx-auto text-center' : 'hidden' 
          } flex flex-1 items-center justify-between xs:absolute xs:right-0 xs:top-full xs:w-full xs:h-[50vh] xs:flex-col xs:bg-white xs:pb-6 xs:shadow-lg sm:absolute sm:right-0 sm:top-full sm:w-full sm:h-[50vh] sm:flex-col sm:bg-white sm:pb-6 sm:shadow-lg md:static md:top-0 md:flex md:w-auto md:flex-row md:bg-transparent md:shadow-none`}
        >
          <ul className="flex flex-1 justify-center gap-8 text-[1rem] font-medium text-black xs:flex-col sm:flex-col md:flex-row">
            <li>
              <Link
                to="/"
                className="transition-colors duration-300 hover:text-[#AD343E]"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="transition-colors duration-300 hover:text-[#AD343E]"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                ABOUT
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="transition-colors duration-300 hover:text-[#AD343E]"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                CONTACT
              </Link>
            </li>
          </ul>

          {/* Buttons */}
        <div className="flex gap-4 xs:flex-col  xs:mt-6 sm:mt-6 sm:flex-col md:flex-row">
  <Link
    to="/signup"
    onClick={() => {
      setIsOpen(false);
    }}
  >
    <Button
    border=''
      name="Sign up"
      backgroundColor="bg-[#AD343E]" // Keep the background color for hover effect
      textColor="text-white"
      padding="px-6 py-2"
      radius="rounded-full"
      className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#9E2A33] hover:shadow-lg "
    />
  </Link>

  <Link
    to="/signin"
    onClick={() => {
      setIsOpen(false);
    }}
  >
    <Button
      name="Login"
      backgroundColor=""
      textColor="text-[#AD343E]" 
      border="border border-[#AD343E]" 
      padding="px-6 py-2"
      radius="rounded-full"
      className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#AD343E] hover:text-white hover:border-transparent hover:shadow-lg xs:px-7 sm:px-7"
    />
  </Link>
</div>


        </section>
      </nav>
    </header>
  );
}

export default Nav;
