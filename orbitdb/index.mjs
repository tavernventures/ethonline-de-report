import { createOrbitDB } from '@orbitdb/core'
import { create } from 'ipfs-core'

// Create an IPFS instance with custom options to disable UPnP.
const ipfs = await create({
  config: {
    // Disable UPnP by setting the Swarm.DisableNatPortMap option to true.
    Swarm: {
      DisableNatPortMap: true,
    },
    Addresses: {
      Swarm: [
        // Use port 4002 (change it as needed).
        '/ip4/0.0.0.0/tcp/4002',
        // Add other swarm addresses if needed.
      ]
    }
  }
})

const orbitdb = await createOrbitDB({ ipfs })

const db = await orbitdb.open('de-reports-db', { 'documents': true })

console.log('de-reports address', db.address)

// Add some records to the db.
await db.add('doc1', { btc: "29648.65", hits: 5 })
await db.add('doc2', { eth: "1608.03", hits: 2 })
await db.add('doc3', { link: "7.60", hits: 7 })
await db.add('doc4', { op: "1.23", hits: 3 })

// Print out the above records.
console.log(await db.all())

// Close your db and stop OrbitDB and IPFS.
await db.close()
await orbitdb.stop()
await ipfs.stop()
