import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";

export default async function Home() {

  return (
    <>
      
      <div className="z-10 w-full max-w-4xl px-5 xl:px-0">
  

        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Making Datasets Available for the Posterity of Academic Research</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
          Master quantitative and qualitative data analysis with step-by-step guides and sample data .
          </Balancer>

        </p>
        
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-md font-bold text-white transition-colors hover:bg-white hover:text-black"
            href=""
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
          </a>

          




          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-md text-gray-600 shadow-md transition-colors hover:border-gray-800 font-bold"
            href=""
            target="_blank"
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
        
            <p>
              <span className="hidden sm:inline-block">Explore Datasets{" "}</span> 

            </p>
           
          </a>
        </div>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))}
      </div>
    </>
  );
}

const features = [
  {
    title: "Beautifully and well-curated research datasets",
    description:
      "Reserach Datasets of various categories, Text datasets, Audio datasets, Video datasets, powered by web3 Technologies",
    large: true,
    demo: (
        <Image
          src="/Dataset.jpg"
          alt="dataset"
          className="object-cover w-full h-full"
          width={420}
          height={30}
    
        />
    ),
  },
  {
    title: "Performance first",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
    demo: <WebVitals />,
  },
  {
    title: "Filecoin Virtual Machine",
    description:
      "The Filecoin Virtual Machine (FVM) is a runtime environment for smart contracts (also called actors) on the Filecoin network.",
    demo: (
      <a href="https://fvm.filecoin.io/">
        <Image
          src="/FilecoinLogo.png"
          alt="filecoin"
          //className="object-cover w-full h-full"
          width={220}
          height={30}
    
        />
      </a>
    ),
  },
  {
    title: "LightHouse Storage",
    description:
      "Data prep for deal making made easy. Upload files, generate CAR and get CAR links - all in one place",
    demo: (
      <div className="flex items-center justify-center space-x-20">
      <a href="https://data.lighthouse.storage/">
        <Image alt="Lighthouse logo" 
        src="/LighthouseLogo.jpeg"
        className="object-cover w-full h-full"
        width={220} 
        height={30} 
        />
      </a>
      </div>
    ),
  },
  {
    title: "IPFS, and more",
    description:
      "The IPFS network is distributed and participatory, which reduces the problem of data silos that plague central servers.",
    demo: (
      <div className="flex items-center justify-center space-x-20">
         <a href="https://ipfs.tech/">
               <Image alt="IPFSLogo" 
               src="/IPFSLogo.png" 
               width={220} 
               height={30} />
            </a>   
      </div>
    ),
  },
];
