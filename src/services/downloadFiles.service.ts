
const gateways = [
    "https://gw.crust-gateway.xyz",
    "https://gw.crust-gateway.com",
    "https://dweb.link",
    "https://ipfs.io"
]

export const downloadFilesService = async (cid: string) => {
    let result: Record<string, string> = {};
    
        for(const gateway of gateways){
            const hostname = new URL(gateway).hostname;
            result[hostname] = `${gateway}/ipfs/${cid}`
        }
    return result;
}

