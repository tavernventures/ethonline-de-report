import React, { useState} from 'react'
import { useContractWrite } from 'wagmi'
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
  } from '@mui/material';
  import {
    deReportAddress
  } from '../config'
  //import DeReport from '../../hardhat-contracts/artifacts/contracts/DeReport.sol'
  import * as dotenv from "dotenv";
  dotenv.config();

  import { create as ipfsHttpClient } from 'ipfs-http-client'

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiKeySecret = process.env.NEXT_PUBLIC_API_KEY_SECRET;
  
  const auth =
    'Basic ' + Buffer.from(apiKey + ':' + apiKeySecret).toString('base64');
  
  const client = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers:{
      'Authorization': auth
    }
  })
  


export default function Form(){ 

  const [formInput, setFormInput] = useState({ asset: '', ticker: '', quantity: '', price: '', tradedate: '' })

  async function uploadToIPFS() {
    const tradeInputs = formInput;

    /* first, upload to IPFS */
    const data = JSON.stringify(tradeInputs)
    try {
      const added = await client.add(data)
      const url = `https://de-report.infura-ipfs.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function safeMint() {
    const { data, isLoading, isSuccess, write } = useContractWrite({
      address: deReportAddress,
      abi: contractInfo,
      functionName: 'safeMint',
    })
    //handleCallContract(url)
  }

  // const handleCallContract = (url) => {
  //   write({
  //     args: ['0xe0ce099DcA25f3a50d1153984aC6BeeC1C4e3f69', 1, url],
  //     // from: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  //     // value: parseEther('0.01'),
  //   })
  // }

  
  const handleFormUpdate = (e) => {
    e.preventDefault()
    console.log("this", e)
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    });
  } 

  const handleSubmit = () => {
    safeMint()
  }
  
  // changeHandler = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // }
  const url = uploadToIPFS()
  var contractInfo = [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"approved","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"bool","name":"approved","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approve","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getApproved","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerOf","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeMint","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"string","name":"uri","internalType":"string"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenByIndex","inputs":[{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenOfOwnerByIndex","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"tokenURI","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]}]
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: deReportAddress,
    abi: contractInfo,
    functionName: 'safeMint',
  })
  return (
    <>

      <Paper>
        <Box px={3} py={2}>
          <Typography variant="h6" align="center" margin="dense">
            Please Input your Trade Data
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="assetName"
                name="asset"
                label="Asset Name"
                fullWidth
                margin="dense"
                onChange={(e) => handleFormUpdate(e)}
              />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.fullname?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                name="ticker"
                label="Ticker"
                fullWidth
                margin="dense"
                onChange={(e) => handleFormUpdate(e)}
              />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.username?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="quantity"
                label="Quantity"
                fullWidth
                margin="dense"
                onChange={(e) => handleFormUpdate(e)}
                // {...register('email')}
                // error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.email?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="price"
                name="price"
                label="Price"
                fullWidth
                margin="dense"
                onChange={(e) => handleFormUpdate(e)}
              />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.password?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirmPassword"
                name="tradedate"
                label="Trade Date"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                fullWidth
                margin="dense"
                onChange={(e) => handleFormUpdate(e)}
              />
      
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.confirmPassword?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <br />
              <Typography variant="inherit" color="textSecondary">

              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => write({
                args: ['0xdc3DE060FF06df185A780124E45a0115f739aFb9', 20, "blah.com"],
                // from: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                // value: parseEther('0.01'),
              })}
            >
              Submit Trade
            </Button>
            
          </Box>
        </Box>
      </Paper>
      </>
    )

}
