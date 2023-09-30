//"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
//import { Session } from "next-auth";

export default function NavBar2() {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <div className = " ">
      <SignInModal />
      <div
        className={`fixed top-14 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-[#1d9bf0] backdrop-blur-xl "
            : "bg-[#1d9bf0]"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full bg-[#1d9bf0] ">


          <Link
            className="group flex max-w-fit items-center justify-center rounded-full border border-black bg-black px-5 py-2 text-md font-bold text-white transition-colors hover:bg-white hover:text-black"
            href="/create"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          
            <p>Submit Datasets</p>
          </Link>

          <Link
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-md font-bold text-white transition-colors hover:bg-white hover:text-black"
            href="/explore"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          
            <p>Explore Datasets</p>
          </Link>

          <Link
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-md font-bold text-white transition-colors hover:bg-white hover:text-black"
            href="/admin"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          
            <p>Admin</p>
          </Link>

          <Link
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-md font-bold text-white transition-colors hover:bg-white hover:text-black"
            href="/profile"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          
            <p>Profile</p>
          </Link>



          
          {/**
          <div>
            { (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white font-bold hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Connect with Google
              </button>
            )}
                     
          </div>

          <div> <ConnectButton /></div>
           */}
        </div>
      </div>
    </div>
  );
}
