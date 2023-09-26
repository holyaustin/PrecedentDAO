import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { getContributions, getDataForProfile } from '@/scripts/polybase';

const Profile = (props) => {
  const wallet = props.wallet;
  const handleCloseProfile = props.handleCloseProfile;
  const [data, setData] = React.useState([]);
  const [numContributions, setNumContributions] = React.useState(0);

  useEffect(() => {
    //getData();
  }, []);

  async function setDataToNull() {
    setData([]);
  }


  async function getData() {
    await setDataToNull();
    const contributions = await getContributions(wallet);
    const profileData = await Promise.all(contributions.map(getDataForProfile));
    setData(profileData);
    setNumContributions(contributions.length);
  }

  const handleProfileClose = () => {
    handleCloseProfile();
  };

  
  return (
    <div className="fixed inset-x-1/4 inset-y-1/4 w-1/2 h-1/2 flex flex-col bg-white text-gray-900 rounded-lg shadow-xl">
    <div className="flex justify-between items-center bg-teal-500 py-4 px-6 rounded-t-lg">
      <h4 className="text-xl font-bold">{wallet}&apos;s Profile</h4>
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={handleProfileClose}
      >
        <FaTimes className="w-5 h-5" />
      </button>
    </div>
    <div className="flex flex-grow p-6 overflow-y-auto">
      <div className="mx-auto w-full">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">Number of Contributions:</p>
          <p className="text-4xl font-bold text-black">{numContributions}</p>
        </div>

        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 my-4 rounded shadow-md">
            <p className="text-gray-900 font-bold">{item.language}</p>
            <p className="text-teal-500">{item.description}</p>
            <a href="/archive">
              <button className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600">
                View in Archive
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default Profile;
