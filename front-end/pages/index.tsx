import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Wallet from "./wallet_sep"
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useIsMounted from "./useisMounted";
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
        <ConnectButton />
        {isConnected && mounted ? <Wallet/> : null}
        <Form/>
      </main>
 
      <footer className={styles.footer}>
     

      </footer>
    </div>
  );
};

export default Home;
