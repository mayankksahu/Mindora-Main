import React, { useState, useEffect, useRef } from 'react';
import icon from '../assets/icon.png';
import { FaTrashAlt } from 'react-icons/fa';
import { RiResetLeftFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

function Header({ handleResetChats }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  const handleConfirmReset = () => {
    handleResetChats();
    setShowConfirm(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showConfirm && dialogRef.current && !dialogRef.current.contains(event.target)) {
        setShowConfirm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showConfirm]);

  return (
    <header className="relative py-4 bg-gray-900/90 backdrop-blur-lg shadow-sm ">

      <div className='flex justify-between px-4 sm:px-64 items-end'>


        <div className="flex justify-center items-center">
          <img src={icon} alt="App Icon" className="w-8" />
          <h1 className="text-xl font-bold text-gradient">Mindora</h1>
          <button
            onClick={() => navigate("/about")}
            className="ml-4 px-4 py-1 border border-purple-500/40 rounded-full text-purple-200 hover:bg-purple-500/10 transition"
          >
            About
          </button>
        </div>
        <button
          onClick={() => setShowConfirm(true)}
          className=" text-red-400 bg-gray-600 p-1 rounded-full"
          title='Reset Chat'
        >
          <RiResetLeftFill />
        </button> </div>
      {showConfirm && (
        <div ref={dialogRef} className="confirmation-dialog absolute z-100 top-12 right-4 sm:right-44 bg-gray-900/80 backdrop-blur-sm text-gray-300 p-4 rounded shadow-lg hover:shadow-lg hover:shadow-purple-500/10 border-gray-800 
            hover:border-purple-500/50">
          <p>want to reset chats?</p>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="mr-2 px-2 py-1  bg-gray-600 rounded"
            >
              <MdCancel size={30} />
            </button>
            <button
              onClick={handleConfirmReset}
              className="px-2 py-1 bg-red-600 rounded"
            >
              <GiConfirmed size={30} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;