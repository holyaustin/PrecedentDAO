import { Polybase } from "@polybase/client";
import { ethers } from "ethers";
import { ethPersonalSign } from '@polybase/eth'



const db = new Polybase({
  defaultNamespace: "pk/0xef0bffa8495694673bf3c1c01413e5ffe987b2fdc47a37b594f5688953c2d53dfc2d2f0a10b91d96354eaac73f6644702b0d7dfbc387dfa632938854eefcf3ef/daolingo",

});


function generateRandomId() {
  //generate random alphanumeric string
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
export async function createUser() {
  
  console.log("Creating object...")
  let tag = generateRandomId()
  await db.collection("Temp").create([tag, "New York"]);
  console.log("Created temp object!")

}

export async function createProposal(languageFamily, description, proposer, proposalId, language, dataType, informationType, DealRequestStruct) {
  const [cidHex, pieceSize, verifiedDeal, label, startEpoch, endEpoch, storagePricePerEpoch, providerCollateral, clientCollateral, extraParamsVersion, extraParams] = DealRequestStruct;
  const [carLink, carSize, tempBool1, tempBool2] = extraParams;
  await db.collection("Proposal").create([proposalId.toString(), language.toString(), dataType.toString(), informationType.toString(), cidHex.toString(), pieceSize.toString(), verifiedDeal.toString(), label.toString(), startEpoch.toString(), endEpoch.toString(), storagePricePerEpoch.toString(), providerCollateral.toString(), clientCollateral.toString(), extraParamsVersion.toString(), carLink.toString(), carSize.toString(), proposer.toString(),  description.toString(), languageFamily.toString()]);
}


export async function createArchive(DealRequestStruct, proposalId) {
  console.log('Creating archive...')

  const collectionReference = db.collection("Proposal");
  const record = await collectionReference.record(proposalId).get();
  const proposer = record.data.proposer;
  const language = record.data.language;
  const dataType = record.data.dataType;
  const informationType = record.data.informationType;
  const languageFamily = record.data.languageFamily? record.data.languageFamily : "";
  const description = record.data.description? record.data.description : "";

  const [cidHex, pieceSize, verifiedDeal, label, startEpoch, endEpoch, storagePricePerEpoch, providerCollateral, clientCollateral, extraParamsVersion, extraParams] = DealRequestStruct;
  const [carLink, carSize, tempBool1, tempBool2] = extraParams;

  await db.collection("Archive").create([proposalId.toString(), language.toString(), dataType.toString(), informationType.toString(), cidHex.toString(), pieceSize.toString(), verifiedDeal.toString(), label.toString(), startEpoch.toString(), endEpoch.toString(), storagePricePerEpoch.toString(), providerCollateral.toString(), clientCollateral.toString(), extraParamsVersion.toString(), carSize.toString(), proposer.toString(), description.toString(), languageFamily.toString()]);
  console.log('Created archive!')
}

export async function getAllProposals() {
  const temp = await db.collection("Proposal").get();
  let proposals = []
  for (let i = 0; i < temp.data.length; i++) {
    //console.log(temp.data[i].data)
    proposals.push(temp.data[i].data)
  }
  //console.log( proposals)
  return proposals
}

export async function getAllArchives() {
  const temp = await db.collection("Archive").get();
  let proposals = []
  for (let i = 0; i < temp.data.length; i++) {
    //console.log(temp.data[i].data)
    proposals.push(temp.data[i].data)
  }
  //console.log( proposals)
  return proposals
}


export async function deleteProposal(proposalId) {
  const collectionReference = db.collection("Proposal");
  await collectionReference.record(proposalId).call("del");
  console.log("Deleted proposal!")
}

export async function getProposalParams(proposalId) {
  const collectionReference = db.collection("Proposal");
  const record = await collectionReference.record(proposalId).get();
  //console.log(record.data)
  const DealRequestStruct =[
    record.data.cidHex,
    record.data.pieceSize,
    (record.data.verifiedDeal == "true"),
    record.data.label,
    Number(record.data.startEpoch),
    Number(record.data.endEpoch),
    Number(record.data.storagePricePerEpoch),
    Number(record.data.providerCollateral),
    Number(record.data.clientCollateral),
    1,
    [record.data.carLink, Number(record.data.carSize), false, false]
  ]
  console.log(DealRequestStruct)
}

export async function createProfile(wallet) {
  const collectionReference = db.collection("Profile");
  //find profile with wallet
  //if not found, create new profile
  const temp = await collectionReference.record(wallet).get();
  if(temp.data != null) {
    console.log("already exists")
    return 
  }
  //keep id = public key
  await collectionReference.create([wallet, wallet]);
}

export async function addContribution(wallet, contribution) {
  const collectionReference = db.collection("Profile");
  await collectionReference.record(wallet).call("addContribution", [contribution]);
}

export async function getContributions(wallet) {
  //console.log(wallet)

  const collection = await db.collection("Profile").record(wallet).get();
  const contributions = collection.data.contributions;
  return contributions;
}

export async function getNumberOfContributions(wallet) {
  const collection = await db.collection("Profile").record(wallet).get();
  const contributions = collection.data.contributions;
  return contributions.length;
}


export async function createChat(proposalId) {
  const collectionReference = await db.collection("Chat");
  const temp = await collectionReference.record(proposalId).get();
  if(temp.data != null) {
    console.log("already exists")
    return 
  }
  await collectionReference.create([proposalId]);
}

export async function addMessage(proposalId, message) {
  const collectionReference =  db.collection("Chat");
  await collectionReference.record(proposalId).call("addMessage", [message]);
}

export async function addMessenger(proposalId, messenger) {
  const collectionReference =  db.collection("Chat");
  await collectionReference.record(proposalId).call("addMessenger", [messenger]);
}

export async function getMessages(proposalId) {
  const collection = await db.collection("Chat").record(proposalId).get();
  //console.log(collection.data)
  const messages = collection.data.messages;
  const messengers = collection.data.messengers;
  let ret = []
  for (let i = 0; i < messages.length; i++) {
    ret.push({messenger: messengers[i], message: messages[i]})
  }
  //console.log(ret)
  return ret;
}

export async function getDataForProfile(proposalId) {
  //get archive object with id = proposalId
  const collection = await db.collection("Archive").record(proposalId).get();

  //console.log(collection.data.language)
  return {language: collection.data.language? collection.data.language: " ", description: collection.data.description? collection.data.description: " "}
}

//console.log(await getDataForProfile("48765461197497924543818806022063248975949937292401964872751984310560292309794"))

export async function popMessages(proposalId) {
  const collectionReference = db.collection("Chat");
  await collectionReference.record(proposalId).call("popMessages");
}

//getMessages("82019313872436929584558327607292929936654932147573250138881067729609655510616")

//popMessages("82019313872436929584558327607292929936654932147573250138881067729609655510616")

//addMessenger("82019313872436929584558327607292929936654932147573250138881067729609655510616", "0x918e61236aC6FbB5EAa57a88709E2Fa43E932DE1")

//addContribution("0x918e61236aC6FbB5EAa57a88709E2Fa43E932DE1", "82019313872436929584558327607292929936654932147573250138881067729609655510616");

//getProposalParams("24923000271803792251928267856477390263985430244943514007382740670081887006376");

// createArchive(
//   [
//     '0x0181e203922020dd727923d73fc56d3c925b4d7f7919a1ec4d3b2c0af9383978a1c358e7f3d118',
//     '262144',
//     false,
//     'baga6ea4seaqkp2pjlh6avlvee6ib2maanav5sd35l5glf3zm6rd6hmfgcx5xeji',
//     520000,
//     1555200,
//     0,
//     0,
//     0,
//     1,
//     [
//       'https://data-depot.lighthouse.storage/api/download/download_car?fileId=a06b3587-9cf6-4b0d-b326-f6866cfdbc1c.car',
//       202867,
//       false,
//       false
//     ]
//   ], "82019313872436929584558327607292929936654932147573250138881067729609655510616"
// )


//deleteProposal("82019313872436929584558327607292929936654932147573250138881067729609655510616")