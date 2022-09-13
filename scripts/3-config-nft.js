import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xDB8ea6fF759488B23f3F421eFc56f8C52Eb4e526");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Freqs NFT",
        description: "This NFT will give you access to the Freqs webapp!",
        image: readFileSync("scripts/assets/Freqs-Logo-Mobile.PNG"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("Failed to create the new NFT", error);
  }
})();

