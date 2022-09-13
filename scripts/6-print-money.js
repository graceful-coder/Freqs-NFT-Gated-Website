import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0xA044CCEc6Cb504b4410807ab4163C4B9A799B2e5");

(async () => {
  try {
    // Max supply of 1M Freq tokens
    const amount = 1_000_000;

    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();

    console.log("✅ There now is", totalSupply.displayValue, "FREQ in circulation");
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
