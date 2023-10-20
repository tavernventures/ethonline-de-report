import {
  useAccount,
  useBalance,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from "wagmi";
import useIsMounted from "./useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import contractInterface from '../contract-abi.json'

function Wallet() {
  const mounted = useIsMounted();
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });
  const { config } = usePrepareContractWrite({
    addressOrName: '0xF6362B1C0E2f86e10579229841287F7b09739e62',
    contractInterface: contractInterface,
    functionName: 'safeMint (0xd204c45e)'
  })

  const write = useContractWrite(config)

  console.log("this is data", write);
  
  return (
    <div>
      {/* <ConnectButton/> */}
      {mounted ? address && <p>Address {address}</p> : null}
      {mounted
        ? data && (
            <p>
              Balance: {data?.formatted} {data?.symbol}
            </p>
          )
        : null}
        <button
          onClick={() => write({
            args: ['0xe0ce099DcA25f3a50d1153984aC6BeeC1C4e3f69', '5'],
          })}
        >
          Mint
        </button>
        {/* {isSuccess ? <h3>Minted</h3> : ""} */}
    </div>
  );
}

export default Wallet;
