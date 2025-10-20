import { ethers } from "ethers";
export const web3Auth = async () => {
    const pair = ethers.Wallet.createRandom();
    const sig = await pair.signMessage(pair.address);
    const authHeaderRaw = `eth-${pair.address}:${sig}`;
    return {
        auth: authHeaderRaw,
        address: pair.address
    };
};
