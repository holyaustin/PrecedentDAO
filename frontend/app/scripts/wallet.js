import { ethers } from "ethers";

export const checkWalletIsConnected = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.log("Make sure you have metamask!");
    return;
  } else {
    console.log("We have the ethereum object", ethereum);
  }
  const provider = new ethers.BrowserProvider(ethereum);
  const network = await provider.getNetwork();
  //setNetwork(network.chainId);
  console.log(network.chainId);

  ethereum.request({ method: "eth_accounts" }).then((accounts) => {
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an account:", account);
    } else {
      console.log("No account found");
    }
  });
};

export const connectWalletHandler = () => {
  const { ethereum } = window;
  if (!ethereum) {
    alert("Get MetaMask!");
    return;
  }
  ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => {
      console.log("Connected", accounts[0]);
    })
    .catch((err) => console.log(err));
};
