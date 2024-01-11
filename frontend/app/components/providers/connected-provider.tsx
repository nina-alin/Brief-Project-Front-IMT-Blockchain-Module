"use client";

import { useSDK } from "@metamask/sdk-react";
import { useRouter } from "next/navigation";
import React from "react";

const ConnectedHOC = ({ children }: { children: React.ReactNode }) => {
  const { connected, connecting } = useSDK();
  const router = useRouter();

  if (connecting) {
    return <p>Loading...</p>;
  }

  // TODO: store cookies ?
  // if (!connected) {
  //   router.push("/");
  //   return <p>You are not authorized to view this page.</p>;
  // }

  return children;
};

export default ConnectedHOC;
