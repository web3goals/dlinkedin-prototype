import useToast from "./useToast";

/**
 * Hook to handle errors.
 */
export default function useError() {
  const { showToastError } = useToast();

  let handleError = function (error: Error, isErrorToastRequired: boolean) {
    console.error(error);
    if (isErrorToastRequired) {
      showToastError(error);
    }
  };

  return {
    handleError,
  };
}
