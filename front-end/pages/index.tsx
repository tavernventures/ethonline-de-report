import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Wallet from "./wallet"
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <Wallet/>
      </main>
 
      <footer className={styles.footer}>
     

      </footer>
    </div>
  );
};

export default Home;
