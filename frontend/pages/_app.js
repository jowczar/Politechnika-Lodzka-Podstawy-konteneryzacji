import styles from './globals.css'
import Head from 'next/head'
import Navbar from '../components/Navbar';
import { UserProvider } from '../contexts/UserProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Subscription Manager</title>
        <meta name="description" content="Subscription Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        {Component.layout !== 'withoutNavbar' && <Navbar />}
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default MyApp
