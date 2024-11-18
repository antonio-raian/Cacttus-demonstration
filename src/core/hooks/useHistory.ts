import { useContext } from "react";
import { HistoryContext } from "../contexts/HistoryContext";

const useHistory = () => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }

  return context;
};

export default useHistory;
