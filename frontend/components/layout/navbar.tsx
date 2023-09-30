"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
//import { Session } from "next-auth";

export default function NavBar() {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <div className = " ">
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-[#1d9bf0] backdrop-blur-xl "
            : "bg-[#1d9bf0]"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full l bg-[#1d9bf0] ">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Precedent DAO</p>
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
 */}
          <div> <ConnectButton /></div>
        </div>
      </div>
    </div>
  );
}
