"use client";
import React, { useState, useEffect } from 'react';
//import { getAllProposals } from '@/scripts/polybase';
import { vote } from "@/app/scripts/contractaddress";
import { ethers } from "ethers";
//import Chat from "./Chat.jsx";
//import governorContract from "@/app/scripts/contractaddress";
//mport dataGovernanceToken from "@/app/scripts/contractaddress";

import governorContract from "../../contracts/GovernorContract.json";
import dataGovernanceToken from "../../contracts/DataGovernanceToken.json";

export default function VoterPage() {
  const [data, setData] = useState([]);
  const [tokens, setTokens] = useState(0);
  const [proposalId, setProposalId] = useState(0);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    getTokens();
    getProposals();
  }, []);


  const handleDiscussClick = (id) => {
    setProposalId(id);
    setShowChat(true);
  };
  const handleCloseChat = () => {

    setShowChat(false);
  };



  async function getProposals() {
    const proposals = await getAllProposals();
    setData(proposals);

  }

  async function getTokens() {
    const { ethereum } = window;
    if (!ethereum) {
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const token = new ethers.Contract(
        dataGovernanceToken.address,
        dataGovernanceToken.abi,
        signer
      );
      const balance = await token.balanceOf(signer.getAddress());
      setTokens(balance.toString());
    } catch (error) {
      console.log('Error getting tokens', error);
    }
  }




  const handleVoteFor = async (proposalId) => {
    console.log(proposalId)
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please connect MetaMask');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const governor = new ethers.Contract(
        governorContract.address,
        governorContract.abi,
        signer
      );
      await vote(governor, 1, proposalId, 'no reason');
      console.log('Voted for proposal', proposalId);
    } catch (error) {
      console.log('Error voting for proposal', proposalId, error);
    }
  };

  const handleVoteAgainst = async (proposalId) => {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please connect MetaMask');
      return;
    }
    try {
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
  return (

    <>
      
      <div className="z-10 w-full max-w-4xl px-5 xl:px-0">
  

        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <b>DAO Members Vote for Dataset Proposals</b>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <b>
          Current Dataset Proposals.
          </b>

        </p>
        </div>
</>
  )
}