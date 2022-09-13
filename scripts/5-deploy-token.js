import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenAddress = await sdk.deployer.deployToken({
      name: "FreqsDAO Token",
      symbol: "FREQ",
      // In case the token is sold, sell to AddressZero
      primary_sale_recipient: AddressZero,
    });
    console.log(
     "✅ Successfully deployed token module, address:", tokenAddress,
    );
  } catch (error) {
    console.error("Failed to deploy token module", error);
  }
})();

