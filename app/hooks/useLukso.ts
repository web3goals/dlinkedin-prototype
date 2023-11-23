import { LuksoContext } from "@/context/lukso";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import useError from "./useError";

/**
 * Hook for work with Lukso.
 */
export default function useLukso() {
  const { isReady, provider, signer, setSigner } = useContext(LuksoContext);
  const { handleError } = useError();
  const [signerAddress, setSignerAddress] = useState<string | undefined>();

  const connect = async function () {
    try {
      if (!provider || !(provider instanceof ethers.BrowserProvider)) {
        throw new Error(
          "Provider is uncorrect, check if you have the Universal Profiles Extension"
        );
      }
      const signer = await (provider as ethers.BrowserProvider).getSigner();
      setSigner?.(signer);
    } catch (error: any) {
      handleError(error, true);
    }
  };

  useEffect(() => {
    if (signer) {
      signer.getAddress().then((address) => setSignerAddress(address));
    } else {
      setSignerAddress(undefined);
    }
  }, [signer]);

  return {
    isReady,
    provider,
    signer,
    signerAddress,
    connect,
  };
}
