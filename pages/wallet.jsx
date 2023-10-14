import { useAccount, useBalance } from 'wagmi'
import useIsMounted from './useisMounted'
import { ConnectButton } from '@rainbow-me/rainbowkit';
 
function Wallet() {
    const mounted = useIsMounted();
    const { address } = useAccount();
    const { data } = useBalance({
    address: address,
  })
  console.log("this is data", data)
  return (
  <div>
    {/* <ConnectButton/> */}
    {mounted ? address && <p>Address {address}</p> : null}
    {mounted ? data && <p>Balance: {data?.formatted} {data?.symbol}</p> : null}
    </div>
  )
}

export default Wallet