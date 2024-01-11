"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";

const MetaMaskClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <MetaMaskProvider
    sdkOptions={{
      dappMetadata: {
        name: "NoName",
      },
    }}
  >
    {children}
  </MetaMaskProvider>
);

export default MetaMaskClientProvider;
