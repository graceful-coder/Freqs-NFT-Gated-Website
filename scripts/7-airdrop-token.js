import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0xDB8ea6fF759488B23f3F421eFc56f8C52Eb4e526");

const token = sdk.getToken("0xA044CCEc6Cb504b4410807ab4163C4B9A799B2e5");

(async () => {
  try {
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
    
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim free NFTs."
      );
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      
      const randomAmount = Math.floor(Math.random() * (10000 -1000 + 1) + 1000);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };
      
    return airdropTarget;
    });
    
    // Call transferBatch on all airdrop targets.
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    
  } catch (error) {
    console.error("Failed to airdrop tokens", error);
  }
})();