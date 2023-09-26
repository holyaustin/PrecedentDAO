import { getMessages } from '@/scripts/polybase';
import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Profile from './profile.jsx';




const Chat = (props ) => {
  const proposalId = props.proposalId;
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('');
  const [profile, setProfile] = React.useState('');
  const [showProfile, setShowProfile] = React.useState(false);

  useEffect(() => {
    //console.log(proposalId)
    // Fetch messages from the server and add them to the messages state
    //getAllMessages()
  }, []);


  async function getAllMessages() {
    const messages = await getMessages(proposalId);
    setMessages(messages);
    //console.log(messages)
  }

  const handleProfileClick = (wallet) => {
    setProfile(wallet);
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, {messenger: "You", message: newMessage}]);
      setNewMessage('');
    }
  };

  const handleCloseChat = () => {
    // Handle closing the chat component here
    props.handleCloseChat();
  };
  const truncatedProposalId =
    proposalId.length > 5 ? `${proposalId.slice(0, 5)}...` : proposalId;


    const truncate = (str) => {
      return str.length > 10 ? str.substring(0, 7) + "..." : str;
    }

  
  return (
    <div>
      {showProfile && (
        <Profile wallet={profile} handleCloseProfile={handleCloseProfile} />
      )}
    <div className="fixed bottom-5 right-5 w-96 bg-white rounded shadow-md">

      <div className="rounded-md flex justify-between items-center px-4 py-2 bg-gray-200">
        <h4 className="text-lg font-bold">Chat - Proposal #{truncatedProposalId}</h4>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleCloseChat}
        >
          
          <FaTimes className="w-5 h-5" />

        </button>
      </div>
      <div className="px-4 py-2 h-40 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span onClick={()=>handleProfileClick(message.messenger)} className="font-bold">{truncate(message.messenger)}: </span> {message.message}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t px-4 py-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          placeholder="Type your message..."
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
    </div>
  );
};

export default Chat;
