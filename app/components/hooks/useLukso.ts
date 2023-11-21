import { LuksoContext } from "@/context/lukso";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import useError from "./useError";
import useToasts from "./useToast";

/**
 * Hook for work with Lukso.
 */
export default function useLukso() {
  const { isReady, provider, signer, setSigner } = useContext(LuksoContext);
  const { handleError } = useError();
  const { showToastError } = useToasts();
  const [signerAddress, setSignerAddress] = useState<string | undefined>();

  const connect = async function () {
    try {
      if (provider && provider instanceof ethers.BrowserProvider) {
        const signer = await (provider as ethers.BrowserProvider).getSigner();
        setSigner?.(signer);
      } else {
        showToastError(new Error("Provider is uncorrect"));
      }
    } catch (error: any) {
      handleError(error, true);
    }
  };

  // TODO: Implement
  const disconnect = async function () {};

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
    disconnect,
  };
}
