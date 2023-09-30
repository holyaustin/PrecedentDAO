import { Github, Twitter } from "@/components/shared/icons";

export default function Footer() {
  return (
    <div className="absolute w-full border-t border-gray-200 bg-black py-5 text-center">
        <a
          href="https://twitter.com/holyaustin/status/1707752460897456506"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Introducing Precedent DAO
          </p>
        </a>
      
      <p className="text-white">
      Precedent DAO (c) 2023. Developed by{" "}
        <a
          className="font-medium transition-colors text-blue-600 dark:text-blue-500 hover:underline"
          href="https://twitter.com/holyaustin"
          target="_blank"
          rel="noopener noreferrer"
        >
          HolyAustin Devs
        </a>
      </p>
    </div>
  );
}
