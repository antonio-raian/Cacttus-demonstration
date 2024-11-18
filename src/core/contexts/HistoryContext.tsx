"use client";
import { History } from "@prisma/client";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getHistoryByApplicationId } from "../services/historyService";
import { useApplications, useLocalStorage, useUser } from "../hooks";

type HistoryContextType = {
  history: History[];
  _createHistory: (
    body: Omit<History, "id" | "createdAt" | "applicationId">
  ) => Promise<void>;
  _deleteHistory: (id: string) => Promise<void>;
};

export const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
);

const HistoryProvider = ({ children }: { children: ReactNode }) => {
  // From context
  const { setLoading, setError } = useUser();
  const { selectedApplication, _updateApplication } = useApplications();
  const { obterItem, salvarItem } = useLocalStorage();

  // States
  const [history, setHistory] = useState<History[]>([]);

  // Functions
  const getHistory = useCallback(async () => {
    try {
      setLoading(true);
      if (!selectedApplication) return;

      let history =
        obterItem(
          `@history_${selectedApplication.userId}_${selectedApplication.id}`
        ) || [];

      if (!history.length)
        history = await getHistoryByApplicationId(selectedApplication.id);
      setHistory(history);

      salvarItem(
        `@history_${selectedApplication.userId}_${selectedApplication.id}`,
        history
      );
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [obterItem, salvarItem, selectedApplication, setError, setLoading]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const _createHistory = async (
    body: Omit<History, "id" | "createdAt" | "applicationId">
  ) => {
    try {
      setLoading(true);
      if (!selectedApplication?.id) return;

      const hasSameStatus = history.some((h) => h.status === body.status);

      if (hasSameStatus) {
        setError("Ja existe um historico com este status");
        throw new Error("Ja existe um historico com este status");
        return;
      }

      const newHistory = {
        id: (history.length + 1).toString(36),
        applicationId: selectedApplication.id,
        ...body,
        createdAt: new Date(),
      };

      // const newHistory = await createHistory({
      //   ...body,
      //   applicationId: selectedApplication.id,
      // });

      _updateApplication({
        ...selectedApplication,
        status: newHistory.status,
        updatedAt: new Date(),
      });

      setHistory([...history, newHistory]);

      salvarItem(
        `@history_${selectedApplication.userId}_${selectedApplication.id}`,
        [...history, newHistory]
      );
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const _deleteHistory = async (id: string) => {
    try {
      setLoading(true);
      if (!selectedApplication?.id) return;

      const filtered = history.filter((h) => h.id !== id);
      // await deleteHistory(id);
      _updateApplication({
        ...selectedApplication,
        status: filtered[filtered.length - 1].status,
        updatedAt: new Date(),
      });
      setHistory(filtered);
      salvarItem(
        `@history_${selectedApplication.userId}_${selectedApplication.id}`,
        filtered
      );
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        get history() {
          return history;
        },
        _createHistory,
        _deleteHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
