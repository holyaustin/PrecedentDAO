import React, { useState, useEffect } from 'react';
import { getAllArchives } from '@/scripts/polybase';


const Archive = () => {
  // Dummy data
  const [data, setData] = useState([]);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    getArchives();
  }, []);

  async function getArchives() {
    const proposals = await getAllArchives();
    setData(proposals);
  }


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
      



        <h2 className="my-10 text-4xl font-bold text-white text-center">Archive</h2>
        <div className="flex flex-col justify-center items-center my-10 w-9/12">
  {data.map((item, index) => (
    <div key={index} className="w-9/12 bg-white text-black p-6 rounded shadow my-4">
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
      <div className="mt-4">
        <div className="flex items-center">
          <p className="font-bold mr-2">CID:</p>
          <div className="flex items-center">
            <span className="bg-gray-200 px-2 py-1 text-sm rounded">{item.label}</span>
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
              onClick={() => {
                navigator.clipboard.writeText(item.label);
                setCopied(true);
              }}
            >
              Copy CID
            </button>
            {copied && (
              <span className="text-green-500 text-sm ml-2">CID copied!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default Archive;
