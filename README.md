# PrecedentDAO

A Dataset Marketplace build on FVM controlled by a DataDAO

## Introduction

Most Datasets especially video datasets are available on centralized storage. This means that these storage can disappear one day and cannot be available for users in the nearest future. Amarum is a Data DAO video project with the aim of helping creators publish exciting video datasets while getting rewarded for that. The datasets upon submission is curated and stored on filecoin SPs through data deals that are established by the DAO. The DAO has the responsibility of storing these datasets and making money from the marketplace paywall. The accrued income is distributed both to DAO members and some kept in the DAO treasury. DAO members can use the Huddle01 video streaming feature to have meetings and record presentation and mint them while storing the Video files on IPFS and Metadata on Filecoin Blockchain.
Contents can also be streamed live through Huddle01 Live Presentation SDK streams. We use the open zeppelin ERC721 standard, Files are store to IPFS / Filecoin using NFT.Storage and  file metadata URI stored on Filecoin Hyperspace Testnet which is FEVM . Upon retrieval. Lighthouse was used to used for encryption and most important, the Access control of Light hoise was used to grant access to member with the membership NFT, Huddle for conference meeting and Push for DAO Notifications. Push Notification notifies DAO members that there is a proposal for vote or there is a meeting for members.

## Web 3.0 technologies Used

Frontend: NextJS, postcss, tailwindcss, Theme

Web3 technologies: LightHouse, Huddle01,  IPFS/filecoin, Tableland, Rainbowkit wallet,  Filecoin (Hyperspace), TableLand, NFT.Storage
Backend: Solidity, Node.js, Ethers.js, hardhat

Blockchain deployed to:  Filecoin (Calibration) Testnet

## Description

This project was made using several technologies. The front-end was designed using a server-side-rendering javascript tech known as NextJS. the latest version of Next was used because of how fast it was to build the project.  IPFS / Filecoin's NFT.Storage was used to store user's video on their decentralized storage. videos of various news can be viewed on demand. New DAO members's data are stored on Tableland. They can share these Videos to anyone through a sharing mechansism that is easy to copy out the sharing IPFS URL. Huddle01 for video streaming ND CONFERENCE MEETING. Huddle01 was used for conference meeting.

The smart contract uses ERC-721 specification to hold metadata URI, ethers.js was used to interact with the smart contract. The contract was deployed to Filecoin Hyperspace blockchain. The entire project demo was hosted to Vercel.

## Live DApp hosted on

Live Dapp on Vercel: - <https://precedentdao.vercel.app/>

  Filecoin (calibration) Testnet deployed Address = " 0xD0c1966B12Dc488945A1917026a6d3Fef692fBDA"

  <https://calibration.filfox.info/en/address/ 0xD0c1966B12Dc488945A1917026a6d3Fef692fBDA>

 Youtube video link: <https://youtu.be/UKGHUkZtesk>

## Getting Started

First, run the development server:

```text
clone the repo 
# next is to 
npm install
# then
npm run dev
# or
yarn dev
```

Open [http://localhost:3016](http://localhost:3016) with your browser to see the result.

## How to run this project locally

Try running some of the following tasks:

Fork this repo using

git clone 
cd soldier-ant-colony

npx hardhat node

npx hardhat run scripts/deploy.js --network localhost

npm run build

## How to deploy to Filecoin  blockchain, update hardhat.config

npx hardhat run scripts/deploy.js --network testnet

## Connect with me and send me a mail

E-mail - <holyaustin@yahoo.com>

stay connected on twitter @holyaustin

<https://calibration.filfox.info/en/address/0xa6d6f4556b022c0c7051d62e071c0acece5a1228>

LightHouse API - 1eceb394-fc75-43cf-83b6-546c9c13da57

2023

Ethereum address (this addresss should work for most tools): 0xa6D6f4556B022c0C7051d62E071c0ACecE5a1228
f4address (also known as t4 address on testnets): f410fu3lpivllaiway4cr2yxaohakz3hfueri6eecg6i
Done in 0.84s.

Compiled 56 Solidity files successfully
deploying "DataGovernanceToken" (tx: 0x6b83241f6f8f16227e54c7c6cf907708c991d0c88ad2ba14cc94db33934dc611)...: deployed at 0xD0c1966B12Dc488945A1917026a6d3Fef692fBDA with 89837605 gas
Checkpoints 1
Delegated to deployer wallet!
deploying "TimeLock" (tx: 0xf56134ee99b3d518a7a9b5eb426b74ea508351d4c909ffe5be5516da43615b20)...: deployed at 0xc4DB00B1B5A319103E5Fb4Ab10C6906796Ef9BFD with 88085944 gas
deploying "GovernorContract" (tx: 0x1a9973b9a9a463ac6adb01e13af03d2dad4a90b24ba0ad479edbf1e8c01217db)...: deployed at 0x5696D1871a993FA353B51d13242b88E8Bc1D5Ecd with 134715138 gas
Setting roles in TimeLock.sol
Roles in TimeLock.sol set!
deploying "DaoDealClient" (tx: 0x129c9b824fba042973a4e8fad135dab2d21226f30ae10c4b9223ee3d63329a2a)...: deployed at 0x2bBb50e984cf50da7399eb32fE9e04af6eF8751e with 150420866 gas
Transferring DaoDealClient Owner to TimeLock.sol
Ownership transferred
Done in 584.85s.


Link to CAR file : carLink
Piece CID : commP
Piece Size: pieceSize
Car Size: {carSize}
Dataset Name: {datasetName}
Data Type: {dataType}
Category Type: {informationType}
Description: {description}
items in Dataset : {itemCount}

https://youtu.be/UKGHUkZtesk
