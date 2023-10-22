import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Wallet from "./wallet_sep"
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useIsMounted from "./useIsMounted";
import {
  useAccount,
} from 'wagmi';
import NavBar from './NavBar';
import Form from './Form'


const Home: NextPage = () => {

  const mounted = useIsMounted();
  const { isConnected } = useAccount();
  return (
    <div className={styles.container}>
      <Head>

        <NavBar/>
      </Head>

      <main className={styles.main}>
        <h2>Welcome to DeReport</h2>
        <h3>Decentralized Reporting Application</h3>
        <ConnectButton />
        {
        isConnected && mounted ? 
        <div><Wallet/><Form/></div> : 
        null}
        
      </main>
 
      <footer className={styles.footer}>
     

      </footer>
    </div>
  );
};

export default Home;
