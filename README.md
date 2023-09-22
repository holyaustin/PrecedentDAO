# PrecedentDAO

A Dataset Marketplace build on FVM controlled by a DataDAO

![Amarum](https://bafkreihqvhqlk4j5ea4hky3fmk24cj6xhw2rhgbkfcbg6fktlkprbec7gm.ipfs.nftstorage.link/)

## Introduction

Most Datasets especially video datasets are available on centralized storage. This means that these storage can disappear one day and cannot be available for users in the nearest future. Amarum is a Data DAO video project with the aim of helping creators publish exciting video datasets while getting rewarded for that. The datasets upon submission is curated and stored on filecoin SPs through data deals that are established by the DAO. The DAO has the responsibility of storing these datasets and making money from the marketplace paywall. The accrued income is distributed both to DAO members and some kept in the DAO treasury. DAO members can use the Huddle01 video streaming feature to have meetings and record presentation and mint them while storing the Video files on IPFS and Metadata on Filecoin Blockchain.
Contents can also be streamed live through Huddle01 Live Presentation SDK streams. We use the open zeppelin ERC721 standard, Files are store to IPFS / Filecoin using NFT.Storage and  file metadata URI stored on Filecoin Hyperspace Testnet which is FEVM . Upon retrieval. Lighthouse was used to used for encryption and most important, the Access control of Light hoise was used to grant access to member with the membership NFT, Huddle for conference meeting and Push for DAO Notifications. Push Notification notifies DAO members that there is a proposal for vote or there is a meeting for members.

## Web 3.0 technologies Used

Frontend: NextJS, postcss, tailwindcss, Theme

Web3 technologies: LightHouse, Huddle01,  IPFS/filecoin, Livepeer (livepeer.js), Web3Modal,  Filecoin (Hyperspace), TableLand, Push Protocol
Backend: Solidity, Node.js

Blockchain deployed to:  Filecoin (Calibration) Testnet

## Description

This project was made using several technologies. The front-end was designed using a server-side-rendering javascript tech known as NextJS. the latest version of Next was used because of how fast it was to build the project.  IPFS / Filecoin's NFT.Storage was used to store user's video on their decentralized storage. videos of various news can be viewed on demand. New DAO members's data are stored on Tableland. They can share these Videos to anyone through a sharing mechansism that is easy to copy out the sharing IPFS URL. Huddle01 for video streaming ND CONFERENCE MEETING. Huddle01 was used for conference meeting.

The smart contract uses ERC-721 specification to hold metadata URI, ethers.js was used to interact with the smart contract. The contract was deployed to Filecoin Hyperspace blockchain. The entire project demo was hosted to Vercel.

## Live DApp hosted on

Live Dapp on Vercel: - <https://amarum.vercel.app/>

  Filecoin (calibration) Testnet deployed Address = "0x4e75D8F85ED40aA3f73fB751b1Dfa07DEFe09C94"

  <https://calibration.filfox.info/en/address/0x4e75D8F85ED40aA3f73fB751b1Dfa07DEFe09C94>

 Youtube video link: <https://youtu.be/kZvxCGMPci8>

## Getting Started

First, run the development server:

```text
clone the repo https://github.com/holyaustin/Mominter.git
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

git clone <https://github.com/holyaustin/Mominter.git>

cd soldier-ant-colony

npx hardhat node

npx hardhat run scripts/deploy.js --network localhost

npm run build

## How to deploy to Filecoin  blockchain, update hardhat.config

npx hardhat run scripts/deploy.js --network testnet

## Connect with me and send me a mail

E-mail - <holyaustin@yahoo.com>

stay connected on twitter @holyaustin

<https://live-par-1-abr-cdn.livepush.io/live_abr_cdn/emaIqCGoZw-6/index.m3u8>

<https://calibration.filfox.info/en/address/0xa6d6f4556b022c0c7051d62e071c0acece5a1228>

LightHouse API - 1eceb394-fc75-43cf-83b6-546c9c13da57

Huddle01 - eee33ed8308ea7f4814202f6fee8c936c80d2f9f03d480b069f13974fe349e21

Nothing to compile
deploying "DataGovernanceToken" (tx: 0xc77ab061aa745e360854c65b7cd16c81899a2aaf11e3e65a3610918c20ea52fc)...: deployed at 0x78F29A7b5A23952dC49E4e865d3B8FE9ACf8255B with 96331480 gas
Checkpoints 1
Delegated to deployer wallet!
deploying "TimeLock" (tx: 0x22336e9bc549323091de94bbcd2ec6ef5836eff16749c5c3a3b8a351c0356ad0)...: deployed at 0xDDFb19892A8D895Df8Fb9828A825dd8a3f67c22D with 86515714 gas
deploying "GovernorContract" (tx: 0x92518bd0634afcc9bb85e6d9f7fb9a36835ab5e556992cd2adbd1d1d20352358)...: deployed at 0xe9C1a529AAC1f83282448d05314Cc2C86F4695f0 with 157560126 gas
Setting roles in TimeLock.sol
Roles in TimeLock.sol set!
deploying "DaoDealClient" (tx: 0x491e1c8d1d6cde85c87ed65cd8c547cb482d2ae92b33441bc15533b7bf6a56a6)...: deployed at 0x465ec9468303A06045De28C96B931ad336E70fe6 with 148273210 gas
Transferring DaoDealClient Owner to TimeLock.sol
Ownership transferred