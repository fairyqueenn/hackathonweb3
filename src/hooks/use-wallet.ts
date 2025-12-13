"use client";

import { useEffect, useState, useCallback } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

/* =========================
   Provider Selector
   (KUNCI UTAMA)
========================= */
function getMetaMaskProvider() {
  if (typeof window === "undefined") return null;

  const { ethereum } = window as any;
  if (!ethereum) return null;

  // Jika ada banyak provider (Phantom, OKX, Rabby, dll)
  if (ethereum.providers?.length) {
    return ethereum.providers.find((p: any) => p.isMetaMask);
  }

  // Jika hanya MetaMask
  return ethereum.isMetaMask ? ethereum : null;
}

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  /* -------------------------
     Connect Wallet
  ------------------------- */
  const connectWallet = useCallback(async () => {
    const provider = getMetaMaskProvider();

    if (!provider) {
      alert("MetaMask not found. Please install MetaMask.");
      return;
    }

    try {
      setIsConnecting(true);

      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      if (accounts?.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error("Failed to connect MetaMask:", err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
  }, []);


  const checkIfWalletIsConnected = useCallback(async () => {
    const provider = getMetaMaskProvider();
    if (!provider) return;

    try {
      const accounts = await provider.request({
        method: "eth_accounts",
      });

      if (accounts?.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error("Failed to get accounts:", err);
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();

    const provider = getMetaMaskProvider();
    if (!provider) return;

    const handleAccountsChanged = (accounts: string[]) => {
      setAccount(accounts.length > 0 ? accounts[0] : null);
    };

    provider.on("accountsChanged", handleAccountsChanged);

    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [checkIfWalletIsConnected]);

  return {
    account,
    isConnecting,
    connectWallet,
    disconnectWallet,
  };
}
