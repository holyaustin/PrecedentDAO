"use client";
import React, { useState, useEffect } from 'react';
//import Navbar2 from "@/components/layout/navbar2";
import { vote } from "@/app/scripts/contractaddress";
import { ethers } from "ethers";
import axios from "axios";
import { Buffer } from 'buffer';
import PrecedenceNFT from "@/app/scripts/PrecedenceNFT.json";
import dataGovernanceToken from "@/app/scripts/abis/DataGovernanceToken.json";
//import Chat from "./Chat.jsx";
import governorContract from "@/app/scripts/abis/GovernorContract.json";

const PrecedentDAOAddress = "0x20bc104513a90B342639572F24045F5EfCF5A9be";
const APIKEY = [process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY];

export default function VoterPage() {
  const [data, setData] = useState([]);
  const [tokens, setTokens] = useState(0);
  const [proposalId, setProposalId] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    getTokens();
    loadProposals();
  }, []);

   async function loadProposals() {
    const { ethereum } = window;
    if (!ethereum) {
      return;
    }
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(PrecedentDAOAddress, PrecedenceNFT.abi, signer);
    console.log("Connected to contract", PrecedentDAOAddress);
    const data = await contract.fetchAllAmarums();
    /*
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token id is ", i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);

      const item = {
        tokenId: i.tokenId,
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        category: meta.data.properties.Category_Type,
        carlink: meta.data.properties.Link_to_CAR_file,
      };

      console.log("item returned is ", item);
      return item;
    }));

    setNfts(items);
    setLoadingState("loaded");
  }
  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  const handleDiscussClick = (nft) => {
    console.log ("proposal id is", nft.tokenId)
    //setProposalId(nft.tokenId);
    setShowChat(true);
  };
  const handleCloseChat = () => {
    setShowChat(false);
  };


  async function getTokens() {
    const { ethereum } = window;
    if (!ethereum) {
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      console.log("Connect wallet signer is", signer.getAddress())
      const token = new ethers.Contract(
        dataGovernanceToken.address,
        dataGovernanceToken.abi,
        signer
      );
      console.log("Data Governance contract is", dataGovernanceToken.address)
      const balance = await token.balanceOf(signer.getAddress());
      console.log("Token balance is", balance)
      setTokens(balance.toString());
    } catch (error) {
      console.log('Error getting tokens', error);
    }
  }




  const handleVoteFor = async (nft) => {
    console.log("nft.tokenId id is", nft.tokenId);
    const proposalId = 1;
    console.log("proposal id is", proposalId);
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please connect MetaMask');
      return;
    }
    try {
      console.log("Waiting for the provider");
      console.log('governor contract is ', governorContract.address);
          const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const governor = new ethers.Contract(
        governorContract.address,
        governorContract.abi,
        signer
      );
      console.log('governor is ', governor);
      await vote(governor, 1, proposalId, 'no reason');
      console.log('Voted for proposal', proposalId);
    
    } catch (error) {
      console.log('Error voting for proposal', proposalId, error);
    }
  };

  const handleVoteAgainst = async (nft) => {
    console.log("nft.tokenId id is", nft.tokenId);
    const proposalId =  nft.tokenId
    console.log("proposal id is", proposalId);
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please connect MetaMask');
      return;
    }
    try {
      console.log("Waiting for the provider");
      
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const governor = new ethers.Contract(
        governorContract.address,
        governorContract.abi,
        signer
      );
      await vote(governor, 0, proposalId, 'no reason');
      console.log('Voted against proposal', proposalId);
      
    } catch (error) {
      console.log('Error voting against proposal', proposalId, error);
    }
  };

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div sx={styles.section}>
        <h1 className="px-20 py-10 text-3xl text-white">Empty space, no DataSet Proposal yet</h1>
      </div>
    );
  }
  return (
    <>
      
      <div className="z-10  max-w-screen-xl px-5 xl:px-0">
  
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-2xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-3xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <b>Current Dataset Proposals.</b>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <b>
          Your Voting Power: {tokens}
          </b>

        </p>

        <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {nfts.map((nft, i) => (

            <div key={i} className="shadow rounded-xl overflow-hidden border-2 border-white-500">
              
              <iframe
                title="DatasetNFT"
                height="auto"
                width="100%"
                objectfit="cover"
                src={`${nft.image}#toolbar=0&embedded=true`}
                className="py-3 object-cover h-500"
              />
          
              <div className="p-1">
                <p style={{ height: "20px", overflow: 'hidden' }} className="text-xl text-blue-800 font-semibold leading-none">Name : {nft.name}      </p>
               {/** <p className="text-xl font-bold text-black pt-2">Size : {nft.size}  MB </p>
                 */}
                <p className="text-xl font-bold text-black pt-2">Category : {nft.category} </p>
                
                <div style={{ height: '30px', overflow: 'hidden' }}>
                    <p className="text-gray-700 pt-2">Description : {nft.description} </p>
                </div>
                <div style={{ height: '80px', overflow: 'hidden' }}>
                    <p className="text-gray-700 pt-2">CAR Link : {nft.carlink} </p>
                </div> 
                
              </div>

              <div className="flex justify-between my-4 p-2 border-4 border-black">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleVoteFor(nft)}>
                  Vote For
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleVoteAgainst(nft)}>
                  Vote Against
                </button>
              </div>

              <div className="p-2 bg-black">
                <button type="button" className="mt-1 w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => handleDiscussClick(nft)}>Video Discuss</button>
              </div>

          
            </div>
          ))}
        </div>
      </div>


      </div>
</>
  )
}