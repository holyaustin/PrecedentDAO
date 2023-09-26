import React, { useState, useEffect } from 'react';
import { getAllProposals } from '@/scripts/polybase';
import { vote } from '@/scripts/aux';
import { ethers } from "ethers";
import Chat from "./Chat.jsx";

import governorContract from "../../contracts/GovernorContract.json";
import dataGovernanceToken from "../../contracts/DataGovernanceToken.json";







const VoterPage = () => {
  // Dummy data
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
    <div className="pt-32 relative min-h-screen">
      <div
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521920592574-49e0b121c964?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 bg-black bg-opacity-75 py-16">
      



        <h2 className="my-10 text-4xl font-bold text-white text-center">Current Proposals</h2>
        <div className="flex flex-col justify-center items-center my-10">
        <div className="bg-gray-200 p-6 rounded shadow-lg my-4 w-96 transform transition-transform duration-300 hover:scale-105">
  <p className="text-2xl font-semibold mb-2">Your Voting Power:</p>
  <p className="text-2xl font-bold text-black">{tokens}</p>
      </div>


          {showChat ? (
            <Chat proposalId={proposalId} handleCloseChat={handleCloseChat} />
          ) : null}

          {data.map((item, index) => (
            <div key={index} className="bg-white text-black p-6 rounded shadow my-4 w-96">
              <div className="grid grid-cols-2 gap-4">
                <p className="font-bold">Language:</p>
                <p>{item.language}</p>
                <p className="font-bold">Data Type:</p>
                <p>{item.dataType}</p>
                <p className="font-bold">Information Type:</p>
                <p>{item.informationType}</p>
                <p className="font-bold">Language Family:</p>
                <p>{item.languageFamily? item.languageFamily: ""}</p>
                <p className="font-bold">Description: </p>
                <p>{item.description? item.description: ""}</p>
              </div>
              <div className="flex justify-between mt-4">
                <button>
                <a href={item.carLink} download className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
                  Download
                </a>
                </button>
                <button className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded'
                onClick={() => handleDiscussClick(item.id)}>
                  Discuss
                </button>
                
                
              </div>
              <div className="flex justify-between mt-4">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleVoteFor(item.id)}>
                  Vote For
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleVoteAgainst(item.id)}>
                  Vote Against
                </button>
              </div>
            </div>
          ))}

          


        </div>
      </div>
    </div>
  );
};

export default VoterPage;
