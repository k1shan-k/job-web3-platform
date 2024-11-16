"use client";
import { Inter } from "next/font/google";
import "./globals.css"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { RainbowProvider } from "@/context/RainbowKitContext";
// import { ContractFuncProvider } from "@/context/ContractFuncWegmiContext";;

import { WagmiProvider } from "wagmi";
// import { config } from "./wagmiconfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer />
      <RainbowProvider>
        {/* <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}> */}
            {children}
          {/* </QueryClientProvider>
        </WagmiProvider> */}
      </RainbowProvider>
      </body>
    </html>
  );
}
