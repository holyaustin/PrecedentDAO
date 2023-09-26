"use client";
import React, { useState, useEffect } from "react";
import governorContract from "../../contracts/GovernorContract.json";
import clientContract from "../../contracts/DaoDealClient.json";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { ethers } from "ethers";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Spinner from 'react-bootstrap/Spinner';
import CID from "cids";
import { checkWalletIsConnected } from "@/app/scripts/wallet";
import { governorContractAddress, daoDealClientAddress } from "@/app/scripts/contractaddress";
// import { createProposal } from "@/app/scripts/polybase";
import { Buffer } from 'buffer';

const governorContractABI = governorContract.abi;
const clientContractAddress = daoDealClientAddress;
const clientContractABI = clientContract.abi;
let daoDealClient;
let dealClient;
let governor;
let cid;

export default function Create() {

  const [commP, setCommP] = useState(
    "baga6ea4seaqbwxbbnrryh6wx73iwwnjbwhmuup4hf4ilfy6oqxy4g7tuzt4voji"
  );
  const [carLink, setCarLink] = useState(
    "https://data-depot.lighthouse.storage/api/download/download_car?fileId=a7e990d4-bfef-41ed-b925-ca2554e3a13c.car"
  );
  const [errorMessageSubmit, setErrorMessageSubmit] = useState("");
  const [pieceSize, setPieceSize] = useState("32768");
  const [carSize, setCarSize] = useState("18445");
  const [txSubmitted, setTxSubmitted] = useState(false);
  const [dealID, setDealID] = useState("");
  const [proposingDeal, setProposingDeal] = useState(false);
  const [language, setLanguage] = useState("");
  const [dataType, setDataType] = useState("");
  const [informationType, setInformationType] = useState("");
  const [languageFamily, setLanguageFamily] = useState("");
  const [description, setDescription] = useState("");



  //const [network, setNetwork] = useState("");

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleChangeDataType = (event) => {
    setDataType(event.target.value);
  };

  const handleChangeInformationType = (event) => {
    setInformationType(event.target.value);
  };

  const handleChangeLanguageFamily = (event) => {
    setLanguageFamily(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeCommP = (event) => {
    setCommP(event.target.value);
  };

  const handleChangeCarLink = (event) => {
    // validate input data here
    setCarLink(event.target.value);
  };

  const handleChangePieceSize = (event) => {
    setPieceSize(event.target.value);
  };

  const handleChangeCarSize = (event) => {
    setCarSize(event.target.value);
  };

 async function changeProposing() {
    setProposingDeal(true);
 }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // do something with the carLink value, like send it to a backend API
    await changeProposing();
    try {
      setErrorMessageSubmit(
        ""
      );
      cid = new CID(commP);

      const { ethereum } = window;
      
      if (ethereum) {

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        daoDealClient = new ethers.Contract(
          clientContractAddress,
          clientContractABI,
          signer
        );

        governor = new ethers.Contract(
          governorContractAddress,
          governorContractABI,
          signer
        );
        
        const extraParamsV1 = [
          carLink,
          carSize,
          false, // taskArgs.skipIpniAnnounce,
          false, // taskArgs.removeUnsealedCopy
        ];

        //TODO this is the one we have to use
        const cidHexString = `0x${Buffer.from(cid.bytes).toString('hex')}`;

        const DealRequestStruct = [
          //cid.bytes ,//cidHex
          cidHexString,
          pieceSize, //taskArgs.pieceSize,
          false, //taskArgs.verifiedDeal,
          commP, //taskArgs.label,
          520000, // startEpoch
          1555200, // endEpoch
          0, // taskArgs.storagePricePerEpoch,
          0, // taskArgs.providerCollateral,
          0, // taskArgs.clientCollateral,
          1, //taskArgs.extraParamsVersion,
          extraParamsV1,
        ];
        
        console.log("here")
        const encodedFunctionCall = daoDealClient.interface.encodeFunctionData("makeDealProposal", [DealRequestStruct]);
        console.log("here")
        console.log(`Proposing on ${clientContractAddress} with ${[DealRequestStruct]} `);

        const proposeTx = await governor.propose(
          [clientContractAddress],
          [0],
          [encodedFunctionCall],
          "Let's put this file in Filecoin!"
        )

        const proposeReceipt = await proposeTx.wait()
        console.log(proposeReceipt)

        const proposalId = proposeReceipt.logs[0].args.proposalId
        console.log(`Proposed with proposal ID:\n  ${proposalId}`)
        const proposalState = await governor.state(proposalId)

        //TODO save the proposalId to Polybase?
          //storeProposalId(proposalId);
          //await createProposal(languageFamily, description, signer.address, proposalId, language, dataType, informationType, DealRequestStruct);

        //End of TODO



        // the Proposal State is an enum data type, defined in the IGovernor contract.
        // 0:Pending, 1:Active, 2:Canceled, 3:Defeated, 4:Succeeded, 5:Queued, 6:Expired, 7:Executed
        console.log(`Current Proposal State: ${proposalState}`)
        setProposingDeal(false);
        setTxSubmitted(true)

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setErrorMessageSubmit(
        "Something went wrong. " + error.name + " " + error.message
      );
      return;
    }
  };


  useEffect(() => {
    checkWalletIsConnected();
  }, []);
 

  return (

    <>
      
      <div className="z-10 w-full max-w-4xl px-5 xl:px-0">
  

        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <b>Create a new  Datasets </b>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <b>
          Steps to create a new dataset on PrecedentDAO .
          </b>

        </p>

        <div className="mt-14 text-black text-xl">
          <div className="flex items-center mb-4">
            <div className="step-number bg-[#1d9bf0] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              1
            </div>
            <div>
              Go to <a href="https://data.lighthouse.storage/dashboard" className="text-[#1d9bf0]">lighthouse.storage</a>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="step-number bg-[#1d9bf0] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              2
            </div>
            <div>
              Upload your file to lighthouse.storage, it is like a temporary storage for your file.
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="step-number bg-[#1d9bf0] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              3
            </div>
            <div>
              Put in the car link and some other info in this form. You will get this info when you click on your uploaded file in lighthouse.storage.
            </div>
          </div>
          <div className="flex items-center">
            <div className="step-number bg-[#1d9bf0] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              4
            </div>
            <div>
              Click propose! We will notify you when your proposal has passed!
            </div>
          </div>
        </div>

        <form className="my-16 child-1 bg-white p-8 rounded shadow-lg w-10/12" onSubmit={handleSubmit}>
  
        <div className="child-1-hg mb-4">
        <label className="mb-1">Link to CAR file</label>

        <div className="relative">
      <div className="tooltip" data-tooltip-id="carfile-tooltip" data-tooltip-delay-hide={50} data-tooltip-html="Find a URL to your car file by going to data.fvm.dev and uploading your file (site in development).<br />You can also go to tech-greedy/generate-car and upload the resulting car file to web3.storage.">
        <AiOutlineQuestionCircle />
      </div>
      <Tooltip id="carfile-tooltip" />
    </div>
  </div>

  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={carLink} onChange={handleChangeCarLink} />

  <div className="child-1-hg mb-4">
    <label className="mb-1">Piece CID</label>

    <div className="tooltip" data-tooltip-id="commp-tooltip" data-tooltip-delay-hide={50} data-tooltip-html="This is also known as the Piece CID.<br />You can go to data.fvm.dev and get this by uploading your file (site in development).<br />This also can be accessed as the output of tech-greedy/generate-car.">
      <AiOutlineQuestionCircle />
    </div>
    <Tooltip id="commp-tooltip" />
  </div>

  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={commP} onChange={handleChangeCommP} />

  <div className="child-1-hg mb-4">
    <label className="mb-1">Piece Size:</label>

    <div className="tooltip" data-tooltip-id="piecesize-tooltip" data-tooltip-delay-hide={50} data-tooltip-html="This is the number of bytes of your Piece (you can read more about Filecoin Pieces in the spec).<br />You can go to data.fvm.dev and get this by uploading your file (site in development).<br />This also can be accessed as the output of tech-greedy/generate-car.">
      <AiOutlineQuestionCircle />
    </div>
    <Tooltip id="piecesize-tooltip" />
  </div>

  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={pieceSize} onChange={handleChangePieceSize} />

  <div className="child-1-hg mb-4">
    <label className="mb-1">Car Size:</label>

    <div className="tooltip" data-tooltip-id="carsize-tooltip" data-tooltip-delay-hide={50} data-tooltip-html="This is the size of the CAR file in bytes.<br />You can go to data.fvm.dev and get this by uploading your file (site in development).<br />This can be accessed as the output of tech-greedy/generate-car.">
      <AiOutlineQuestionCircle />
    </div>
    <Tooltip id="carsize-tooltip" />
  </div>

  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={carSize} onChange={handleChangeCarSize} />

 <div> <label className="mb-1">Dataset Name</label></div>
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={language} onChange={handleChangeLanguage} />
  <div> <label className="mb-1">Data Type. (Eg. Video, Rar, Zip, PDF, Audio, JSON, Image, etc.)</label></div>
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={dataType} onChange={handleChangeDataType} />
  <div> <label className="mb-1">Category Type. (Eg. Science, Sports, Engineeering, Animation, Medicine etc.)</label></div>
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={informationType} onChange={handleChangeInformationType} />

  <div> <label className="mb-1">Description of the content</label></div>
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={description} onChange={handleChangeDescription} />

  <div> <label className="mb-1">Number of individual items in Dataset. (Eg. 200 videos, 450 json files etc) </label></div>
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={languageFamily} onChange={handleChangeLanguageFamily} />
  



  <button
    type="submit"
    className="block bg-[#1d9bf0] text-white text-center rounded px-4 py-2 w-full mb-4 hover:bg-teal-600 transition-colors"
    disabled={proposingDeal}
  >
    {proposingDeal ? "Proposing..." : (txSubmitted ? "You're all set!" : "Propose!")}
  </button>


  <div className="text-red-500 mb-2">{errorMessageSubmit}</div>
  {proposingDeal && (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )}
  <div className="text-green-500 mb-2">{txSubmitted}</div>
</form>

   </div>
</>
  )
}