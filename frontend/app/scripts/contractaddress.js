
export const dataGovernanceTokenAddress = "0xD0c1966B12Dc488945A1917026a6d3Fef692fBDA"
export const timeClockAddress = "0xc4DB00B1B5A319103E5Fb4Ab10C6906796Ef9BFD"
export const governorContractAddress = "0x5696D1871a993FA353B51d13242b88E8Bc1D5Ecd"
export const daoDealClientAddress = "0x2bBb50e984cf50da7399eb32fE9e04af6eF8751e"

export async function vote(governor, voteWay, proposalId, reason) {
  console.log("Voting...")

  const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason);
  const voteTxReceipt = await voteTx.wait(1);
  console.log(voteTxReceipt.logs[0].args.reason);
  const proposalState = await governor.state(proposalId);
  console.log(`Current Proposal State: ${proposalState}`);
  
}

export async function queueAndExecute(daoDealClient, governor, DealRequestStruct) {
  const args = [DealRequestStruct]
  const functionToCall = "makeDealProposal"
  const encodedFunctionCall = daoDealClient.interface.encodeFunctionData(functionToCall, args)
  const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Let's put this file in Filecoin!"));
  // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

  console.log("Queueing...")
  const queueTx = await governor.queue([daoDealClient.address], [0], [encodedFunctionCall], descriptionHash)
  await queueTx.wait(1)

  console.log("Executing...")
  // this will fail on a testnet because you need to wait for the MIN_DELAY!
  const executeTx = await governor.execute(
    [daoDealClient.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  await executeTx.wait()
  console.log("Queued and Executed! ")


}
