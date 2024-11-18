import { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";

// Hook to access the selectedUser context
const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within a ApplicationProvider"
    );
  }
  return context;
};

export default useApplications;
