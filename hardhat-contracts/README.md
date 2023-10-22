## Hardhat contract deployment for ETHOnline-de-Report

    npx hardhat compile

    npx hardhat run --network goerli scripts/deploy.ts 

Create `constructor-args.json` file and add:

    ["0xdc3DE060FF06df185A780124E45a0115f739aFb9"]

Verify:

    npx hardhat verify --network goerli --constructor-args constructor-args.json
    0xf6362b1c0e2f86e10579229841287f7b09739e62
```

scrollSepolia

    npx hardhat run --network scrollSepolia scripts/deploy.ts

    npx hardhat verify --network scrollSepolia 0xa6f4dc81f3f3C3Ec17682B9C0A0f1e5a36cbE055