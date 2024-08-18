import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-900 text-white ">
      <div className="mycontainer flex justify-between px-4 py-5 items-center h-14 ">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-slate-200"> &lt;</span>
          Pass
          <span className="text-slate-200">OP/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-5">
            <a className="hover:font-bold" href="#">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="text-white mx-6 flex gap-3 cursor-pointer justify-center items-center">
          <img className="invert w-11 py-1 " src="icons/github.png" alt="" />
          <p className="py-3">github</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
