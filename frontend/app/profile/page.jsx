"use client";
import { Database } from "@tableland/sdk";
import { Signer, providers } from "ethers";
import { useState } from "react";

async function connectSigner() {
  // Establish a connection with the browser wallet's provider.
  const provider = new ethers.BrowserProvider(ethereum);

  // Create a signer from the returned provider connection.
  const signer = await provider.getSigner();
  // Return the signer
  return signer;
}


async function connectDatabase(signer) {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Do create, write, and read operations
}
const Inputs = () => {
  const [signer, setSigner] = useState();
  const [database, setDatabase] = useState();

  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
    // Connect and interact with the database
    await connectDatabase(signer);
  }

  const create = async () => {
    // Default to grabbing a wallet connection in a browser
    const db = new Database();
  
    // This is the table's `prefix`--a custom table value prefixed as part of the table's name
    const prefix = "my_sdk_table";
  
    const { meta: create } = await db
      .prepare(`CREATE TABLE ${prefix} (id integer primary key, name text, area text, wallet text);`)
      .run();
  
    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    const { name } = create.txn; // e.g., my_sdk_table_80001_311
  }
  
  const read = async () => {
    const tableName = "precedence_3141_1"; // Our pre-defined health check table
      
    const db = new Database();
      
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);
  }
    
  const insert = async () => {
    // Insert a row into the table
    const { meta: insert } = await db
      .prepare(`INSERT INTO ${name} (id, name, area, wallet ) VALUES (?, ?, ?, ?);`)
      .bind(0, "Bobby Tables")
      .run();
  
    // Wait for transaction finality
    await insert.txn.wait();
  
    // Perform a read query, requesting all rows from the table
    const { results } = await db.prepare(`SELECT * FROM ${name};`).all();
  }

  return (

    <>
      
      <div className="z-10 w-full max-w-4xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <b>Create a Profile</b>
        </h1>

        <div className=" text-xl text-center text-black font-bold pt-10 pb-1">
          <h1> Register with your details</h1>
        </div>
        <div className="flex justify-center">
          <div className="w-1/2 flex flex-col pb-12 ">
            <input
              placeholder="Enter a profile name"
              className="mt-3 border rounded p-2 text-xl"
            // onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
            />
            <input
              placeholder="Area of specialty"
              className="mt-3 border rounded p-2 text-xl"
            // onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
            />
            <input
              placeholder="Enter wallet address for payout"
              className="mt-3 border rounded p-2 text-xl"
            // onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
            />
            <button type="button" onClick={async () => handleConnect()} className="font-bold mt-20 bg-blue-700 text-white text-2xl rounded p-4 shadow-lg">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
        
export default Inputs;