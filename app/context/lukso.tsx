import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";

interface ILuksoContext {
  isReady: boolean;
  provider: ethers.Provider | undefined;
  signer: ethers.Signer | undefined;
  setProvider: (provider: ethers.Provider | undefined) => void;
  setSigner: (signer: ethers.Signer | undefined) => void;
}

export const LuksoContext = createContext<Partial<ILuksoContext>>({});

export function LuksoProvider({ children }: any) {
  const [isReady, setIsReady] = useState(false);
  const [provider, setProvider] = useState<ethers.Provider | undefined>();
  const [signer, setSigner] = useState<ethers.Signer | undefined>();

  async function init() {
    let provider;
    let signer;
    const lukso = (window as any).lukso;
    if (lukso == null) {
      // provider = ethers.getDefaultProvider(); // TODO: Implement
    } else {
      provider = new ethers.BrowserProvider(lukso);
      const signers = await provider.listAccounts();
      if (signers.length > 0) {
        signer = signers[0];
      }
    }
    setProvider(provider);
    setSigner(signer);
    setIsReady(true);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <LuksoContext.Provider
      value={{
        isReady,
        provider,
        signer,
        setProvider,
        setSigner,
      }}
    >
      {children}
    </LuksoContext.Provider>
  );
}
