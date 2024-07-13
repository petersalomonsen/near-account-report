let rpcIndex = 0;

const rpcs = [
    'https://free.rpc.fastnear.com',
    'https://near.lava.build',
    'https://rpc.mainnet.near.org',
    'https://1rpc.io/near',
    'https://archival-rpc.mainnet.near.org',
    'https://archival-rpc.mainnet.pagoda.co'
];

export async function queryMultipleRPC(queryFunction) {
    const queryRPC = async (rpcUrl) => {
        const response = await queryFunction(rpcUrl);
        const resultObj = await response.json();
        return resultObj;
    };
    let resultObj;
    for (let n = 0; n < rpcs.length; n++) {
        try {
            resultObj = await queryRPC(rpcs[(n + rpcIndex) % rpcs.length]);

            if (resultObj && !resultObj.error) {
                break;
            }
        } catch { }
    }
    rpcIndex++;
    return resultObj;
}