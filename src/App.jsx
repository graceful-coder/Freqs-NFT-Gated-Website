import { useAddress, useMetamask, useEditionDrop, useToken } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const App = () => {
  // Use the thirdweb hooks.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address)
    
  // Initialize editionDrop contract
  const editionDrop = useEditionDrop("0xDB8ea6fF759488B23f3F421eFc56f8C52Eb4e526");
  const token = useToken("0xA044CCEc6Cb504b4410807ab4163C4B9A799B2e5");
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // Loading state while the NFT is minting
  const [isClaiming, setIsClaiming] = useState(false);

  // Holds the amount of token each member has
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  // Array of member addresses
  const [memberAddresses, setMemberAddresses] = useState([]);

  // Shorten the view of the wallet address
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  // Algorithm grabs all addresses of members holding Freqs NFT
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
    const getAllAddresses = async () => {
      try {
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0);
        setMemberAddresses(memberAddresses);
        console.log("Members addresses", memberAddresses);
      } catch (error) {
        console.error("failed to get member list", error);
      }
    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop.history]);

  // Algorithm grabs # of tokens each member holds
  useEffect(() => {
    if(!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("👜 Amounts", amounts);
      } catch (error) {
        
      }
    }
  })


  
  
  useEffect(() => {
    // If no connected wallet, exit
    if (!address) {
      return;
    }
    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 This user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 This user doesn't have a membership NFT.");
        }
      } catch (error) {
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async() => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log("🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/" + editionDrop.getAddress() + "/0");
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  }

  
  // This is the case where the user hasn't connected their wallet
  // to my web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <img src="scripts/assets/Freqs.svg" className="center"></img>
        <h1>Welcome to FreqsDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero center">
          Connect your wallet
        </button>
      </div>
    );
  }

 if (hasClaimedNFT) {
  return (
    <div className="member-page">
      <h1>DAO Member Page</h1>
      <p>Congratulations on being a member</p>
      </div>
  );
 };
  
  // Render mint nft screen.
  return (
    <div className="mint-nft">
      <h1>Mint your free DAO Membership NFT</h1>
      <button disabled={isClaiming} onClick={mintNft}>
        {isClaiming ? "Minting...": "Mint your nft (FREE)"}
      </button>
    </div>
  );
}

export default App;