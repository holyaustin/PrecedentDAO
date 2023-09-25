'use client';
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Head from 'next/head';
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
//import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  filecoin,
  filecoinCalibration,
  base,
  zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    filecoin,
    goerli,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [filecoinCalibration] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'PrecedentDAO',
  projectId: '8863ce81538fff6c8945b09a9f474917',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
/**
export const metadata = {
  title: "Precedent - Building blocks for your Next.js project",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  twitter: {
    card: "summary_large_image",
    title: "Precedent - Building blocks for your Next.js project",
    description:
      "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
    creator: "@steventey",
  },
  metadataBase: new URL("https://precedentdao.vercel.app"),
  themeColor: "#FFF",
};
 */

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en">
    <Head>
        <title>Precedent DAO</title>
        <meta
          content="Precedent DAO"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <body className={cx(sfPro.variable, inter.variable)}>
      <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>

        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        <Suspense fallback="...">
         
          <Navbar />
        </Suspense>

        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
            </main>
        </RainbowKitProvider>
    </WagmiConfig>
        <Footer />
        <Analytics />

      </body>
        </html>

  );
}
