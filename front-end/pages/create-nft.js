import { useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { Buffer } from 'buffer'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useWAGMI } from 'wagmi'
import { RainbowButton } from '@rainbow-me/rainbow-button'

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_SECRET;

const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers:{
    'Authorization': auth
  }
})

import {
  deReportAddress
} from '../config'

import DeReport from '../artifacts/contracts/DeReport.sol/DeReport.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ name: '', description: '' , price: '', quantity:'', date:''})
  const router = useRouter()
  const { web3, account } = useWAGMI()  // Initialize WAGMI

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://de-report.infura-ipfs.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://de-report.infura-ipfs.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function listNFTForSale() {
    if (!web3 || !account) {
      console.log('Wallet not connected')
      return
    }

    const url = await uploadToIPFS()
    const provider = new ethers.providers.Web3Provider(web3)
    const signer = provider.getSigner()

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(deReportAddress, DeReport.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    let transaction = await contract.createToken(url, price, { value: listingPrice })
    await transaction.wait()

    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        {/* ... (rest of your HTML code for form remains the same) */}

        <RainbowButton 
          className="font-bold mt-4 shadow-lg"
          chainId={1}  // Set appropriate chainId for the Ethereum network you're working with
          connectorOptions={{}}  // Optional. Connector-specific options
          onConnectorInitialized={connector => {
            console.log('Connector has been initialized', connector)
          }}
          onSessionConnected={wallet => {
            console.log('Wallet session is connected', wallet)
          }}
          onSessionDisconnected={() => {
            console.log('Wallet session is disconnected')
          }}
          onError={error => {
            console.log('An error occurred', error)
          }}
        >
          Connect with Rainbow
        </RainbowButton>
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>
  )
}
