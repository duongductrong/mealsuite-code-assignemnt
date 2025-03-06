import { useQueryState } from "nuqs";

export const useFilterStatus = () => {
  const [status, setStatus] = useQueryState("status");

  return {
    status,
    setStatus,
  };
};
