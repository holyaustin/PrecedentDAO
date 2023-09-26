import React, {useState} from "react";
import { ethers } from "ethers";
import { getProposalParams, createArchive, deleteProposal } from "@/scripts/polybase";
import governorContract from "../../contracts/GovernorContract.json";
import daoDealClient from "../../contracts/DaoDealClient.json";

//queue and execute

export function Admin() {
  const [proposalId, setProposalId] = useState("");

  const handleProposalIdChange = (event) => {
    setProposalId(event.target.value);
  };

  function queueAndExecuteProposal() {
    try {
    setProposalId("")
    const governor = new ethers.Contract(
      governorContract.address,
      governorContract.abi,
      signer
    );
    const dao = new ethers.Contract(
      daoDealClient.address,
      daoDealClient.abi,
      signer
    );
    console.log("getting args...")
    const args = getProposalParams(proposalId)
    console.log("passing to queue and execute...")
    queueAndExecute(dao, governor, args)
    
    //store it as archive on polybase.
    console.log("storing in polybase...")
    createArchive(args, proposalId)
    console.log("removing redundant data...")
    deleteProposal(proposalId)
    console.log("done!")
    } catch (error) {
      console.log('Error queueing and executing proposal', error);
    }

    

    
  }

  return (
    <div className="pt-32">
      
      <h1 className="text-black text-2xl m-10">Admin Page</h1>

      <div>
        <label className="text-black text-2xl m-10">Proposal ID</label>
        <input onChange={handleProposalIdChange} className="bg-teal-200 text-black text-2xl m-10" type="text" id="proposalId" name="proposalId" value={proposalId} />
        <button className="text-2xl bg-blue" onClick={queueAndExecuteProposal}>Submit</button>
      </div>


    </div>
  );
}

export default Admin;