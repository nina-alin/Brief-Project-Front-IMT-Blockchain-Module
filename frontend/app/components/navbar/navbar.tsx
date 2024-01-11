"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "../general/button";
import { FaUserAlt } from "react-icons/fa";
import { useSDK } from "@metamask/sdk-react";

const Navbar = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  if (connecting) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="flex items-center justify-between text-black w-full px-10 py-5 absolute">
      <div className="flex items-center justify-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <h1 className="text-3xl font-bold">NoName</h1>
      </div>
      <div className="flex items-center justify-center">
        {!connected && !account ? (
          <Button title="Login" onClick={connect} />
        ) : (
          <p className="flex items-center gap-2">
            <FaUserAlt />
            {account}
          </p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
