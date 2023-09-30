"use client";
import React, { useState, useEffect } from "react";
import { NFTStorage } from "nft.storage";
import governorContract from "../../contracts/GovernorContract.json";
import clientContract from "../../contracts/DaoDealClient.json";
import "react-tooltip/dist/react-tooltip.css";
import { Database } from "@tableland/sdk";
import { Tooltip } from "react-tooltip";
import { ethers } from "ethers";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Spinner from 'react-bootstrap/Spinner';
import CID from "cids";
import { checkWalletIsConnected } from "@/app/scripts/wallet";
import { governorContractAddress, daoDealClientAddress } from "@/app/scripts/contractaddress";
import PrecedenceNFT from "@/app/scripts/PrecedenceNFT.json";
// import { createProposal } from "@/app/scripts/polybase";
import { Buffer } from 'buffer';
const PrecedentDAOAddress = "0x20bc104513a90B342639572F24045F5EfCF5A9be";
const APIKEY = [process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY];

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
  const [datasetName, setDatasetName] = useState("");
  const [dataType, setDataType] = useState("");
  const [informationType, setInformationType] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [description, setDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();

  const handleFileUpload = (event) => {
    console.log("Sample for upload selected...");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURL("");
    setTxURL("");
  };

  const handleChangeDatasetName = (event) => {
    setDatasetName(event.target.value);
  };

  const handleChangeDataType = (event) => {
    setDataType(event.target.value);
  };

  const handleChangeInformationType = (event) => {
    setInformationType(event.target.value);
  };

  const handleChangeItemCount = (event) => {
    setItemCount(event.target.value);
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

 const uploadDataSet = async (uploadedFile) => {
  console.log("upload dataset pics");
  //const { name, total, category, description } = formInput;
  console.log("form input");
  console.log("Link to CAR file", carLink);
  console.log("Piece CID", pieceSize);
  console.log("Car Size", carSize);
  console.log("DataSet name", datasetName);
  console.log("total", itemCount);
  console.log("image:", uploadedFile);
  console.log("category", informationType);
  console.log("description", description);
  console.log("NFT.storage API", APIKEY);

  //if (!name || !description || !inputFile) return;
  console.log("Picture check"); 
  const nftStorage = new NFTStorage({ token: APIKEY, });
   console.log("NFT.storage");
  try {
    console.log("Trying to upload file to ipfs");
    setTxStatus("Uploading Video to IPFS via NFT.Storage");
    console.log("close to metadata");
    const metaData = await nftStorage.store({
      name: datasetName,
      description: description,
      image: uploadedFile,
      properties: {
        Link_to_CAR_file : carLink,
        Piece_CID : commP,
        Piece_Size : pieceSize,
        Car_Size : carSize,
        Data_Type : dataType,
        Category_Type : informationType,
        items_in_Dataset : itemCount,
      },
    });
    console.log("metadata is: ", { metaData });
    setMetaDataURL(metaData.url);
    console.log("metadata URL is: ", metaData.url );


    // add metadata to blockchain
    const { ethereum } = window;
      
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();


        const connectedContract = new ethers.Contract(PrecedentDAOAddress, PrecedenceNFT.abi, signer);
        console.log("Connected to contract", PrecedentDAOAddress);
        console.log("IPFS blockchain uri is ", metaData.url);
        
        const PrecedenceTx = await connectedContract.createToken(metaData.url);
        console.log("File successfully created and added to Blockchain");
        await PrecedenceTx.wait();

        /**
     const proposeReceipt = await proposeTx.wait()
        console.log(proposeReceipt)

        const proposalId = proposeReceipt.logs[0].args.proposalId
        console.log(`Proposed with proposal ID:\n  ${proposalId}`)
        const proposalState = await governor.state(proposalId)
        console.log(`Current Proposal State: ${proposalState}`)
        setProposingDeal(false);
        setTxSubmitted(true)
     */

      } else {
        console.log("Ethereum object doesn't exist!");
      }

    return metaData;
    
  } catch (error) {
    setErrorMessage("Could store file to NFT.Storage - Aborted file upload.");
    console.log("Error Uploading Content", error);
  }
};

  const handleSubmit = async (event, uploadedFile) => {
    console.log("Inside DAO client contract");
    event.preventDefault();
    // do something with the carLink value, like send it to a backend API
    await uploadDataSet(uploadedFile);

    await changeProposing();

    try {
      setErrorMessageSubmit("" );
      cid = new CID(commP);

      const { ethereum } = window;
      
      if (ethereum) {

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        console.log("passed the dao signer");
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
        
        console.log("Before Dao Client")
        const encodedFunctionCall = daoDealClient.interface.encodeFunctionData("makeDealProposal", [DealRequestStruct]);

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

        <form className="my-16 child-1 bg-white p-8 rounded shadow-lg w-10/12" onSubmit={(event) => handleSubmit(event, uploadedFile)}>
  
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
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={datasetName} onChange={handleChangeDatasetName} />


  <div> <label className="mb-1">Data Type. (Eg. Video, Rar, Zip, PDF, Audio, JSON, Image, etc.)</label></div>
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={dataType} onChange={handleChangeDataType} />


  <div> <label className="mb-1">Category Type. (Eg. Science, Sports, Engineeering, Animation, Medicine etc.)</label></div>
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={informationType} onChange={handleChangeInformationType} />


  <div> <label className="mb-1">Description of the content</label></div>
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={description} onChange={handleChangeDescription} />


  <div> <label className="mb-1">Number of individual items in Dataset. (Eg. 200 videos, 450 json files etc) </label></div>
  <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={itemCount} onChange={handleChangeItemCount} />
  

              <h3>Upload your sample picture</h3>
              <input type="file" onChange={handleFileUpload} className="text-black mt-2 border rounded  text-xl" />

      



  <button
    type="submit"
    className="block bg-[#1d9bf0] text-white text-center rounded px-4 py-2 w-full p-10 mb-4 hover:bg-black transition-colors"
    disabled={proposingDeal}
  >
    {proposingDeal ? "Proposing..." : (txSubmitted ? "Proposal successfully submitted" : "Create Proposal")}
  </button>


  <div className="text-red-500 mb-2">{errorMessageSubmit}</div>
  {proposingDeal && (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )}
  <div className="text-[#1d9bf0]  mb-2">{txSubmitted}</div>
</form>

   </div>
</>
  )
}