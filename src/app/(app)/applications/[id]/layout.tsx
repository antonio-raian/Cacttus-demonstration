import HistoryProvider from "@/core/contexts/HistoryContext";
import React from "react";

const ApplicationDetailLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <HistoryProvider>{children}</HistoryProvider>;
};

export default ApplicationDetailLayout;
