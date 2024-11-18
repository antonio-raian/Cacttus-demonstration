import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

// Hook to access the selectedUser context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;
