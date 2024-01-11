"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";

const MetaMaskClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <MetaMaskProvider>{children}</MetaMaskProvider>;

export default MetaMaskClientProvider;
