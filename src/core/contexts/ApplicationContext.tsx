"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getApplicationsByUserId } from "../services/applicationService";
import { Application } from "@prisma/client";
import { useLocalStorage, useUser } from "../hooks";

type ApplicationContextType = {
  selectedApplication: Application | undefined | null;
  applications: Application[] | undefined;
  searchTerm: string;
  filterTerm: Record<string, string | undefined>;
  setSearchTerm: (term: string) => void;
  setFilterTerm: (term: Record<string, string | undefined>) => void;
  _resetApplications: () => void;
  _getApplicationDetails: (id: number) => void;
  _createApplication: (
    body: Omit<Application, "id" | "createdAt" | "userId">
  ) => void;
  _updateApplication: (body: Partial<Application>) => void;
  _deleteApplication: (id: number) => void;
};

export const ApplicationContext = createContext<
  ApplicationContextType | undefined
>(undefined);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  // From context
  const { selectedUser, setLoading, setError } = useUser();
  const { obterItem, salvarItem, removerItem } = useLocalStorage();

  // States
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterTerm, setFilterTerm] = useState<
    Record<string, string | undefined>
  >({
    status: undefined,
    workStyle: undefined,
    contractType: undefined,
  });

  // Functions
  const _getAllApplications = useCallback(async () => {
    try {
      if (!selectedUser?.id) return;
      setLoading(true);

      let apps: Application[] = [];
      const appsLocal = obterItem(`@applications_${selectedUser?.id}`) || [];
      if (!appsLocal.length) {
        apps = await getApplicationsByUserId(selectedUser?.id);
      }

      salvarItem(`@applications_${selectedUser?.id}`, [...apps, ...appsLocal]);
      setApplications([...apps, ...appsLocal]);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [selectedUser?.id, setLoading, obterItem, salvarItem, setError]);

  useEffect(() => {
    _getAllApplications();
  }, [_getAllApplications]);

  const _getApplicationDetails = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        setSelectedApplication(
          applications.find((app: Application) => app.id === id)
        );
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, applications, setError]
  );

  const _resetApplications = useCallback(() => {
    setApplications([]);
    setSelectedApplication(undefined);
    setError(null);
    setLoading(true);
  }, [setError, setLoading]);

  const _filterApplications = useCallback(() => {
    try {
      const lowerSearch = searchTerm.toLowerCase().split(" ");

      const filteredApplications = applications.filter((app) => {
        const { status, workStyle, contractType } = filterTerm;

        return (
          (!status || app.status === status) &&
          (!workStyle || app.workStyle === workStyle) &&
          (!contractType || app.contractType === contractType)
        );
      });

      return filteredApplications.filter((app) => {
        const texto = `${app.title} ${app.company}`.toLowerCase();

        return lowerSearch.every((word) => texto.includes(word));
      });
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else throw error;
    }
  }, [applications, filterTerm, searchTerm, setError]);

  const _createApplication = useCallback(
    async (body: Omit<Application, "id" | "createdAt" | "userId">) => {
      try {
        setLoading(true);
        if (!selectedUser?.id) return;

        const app = {
          id: applications.length + 1,
          ...body,
          userId: selectedUser.id,
          createdAt: new Date(),
        };

        const history = [
          {
            id: 1,
            applicationId: app.id,
            status: "applied",
            createdAt: app.applicationDate,
            anotation: "Candidatura feita",
          },
        ];

        if (app.status !== "applied")
          history.push({
            id: 2,
            applicationId: app.id,
            status: app.status,
            createdAt: new Date(),
            anotation: "",
          });

        setApplications([...applications, app]);

        salvarItem(`@applications_${selectedUser?.id}`, [...applications, app]);
        salvarItem(`@history_${app.userId}_${app.id}`, history);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else throw error;
      } finally {
        setLoading(false);
      }
    },
    [applications, salvarItem, selectedUser, setError, setLoading]
  );

  const _updateApplication = useCallback(
    async (body: Partial<Application>) => {
      try {
        setLoading(true);

        const appLocal: Application = {
          ...selectedApplication,
          ...body,
          updatedAt: new Date(),
        } as Application;

        console.log({ selectedApplication, body, appLocal });

        const index = applications.findIndex((app) => app.id === body.id);

        applications[index] = appLocal;

        // const app = await updateApplication(body);
        setApplications(applications);
        setSelectedApplication(appLocal);

        salvarItem(`@applications_${selectedUser?.id}`, applications);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else throw error;
      } finally {
        setLoading(false);
      }
    },
    [
      applications,
      salvarItem,
      selectedApplication,
      selectedUser?.id,
      setError,
      setLoading,
    ]
  );

  const _deleteApplication = async () => {
    try {
      setLoading(true);
      if (!selectedApplication)
        return setError("Necessário selecionar uma aplicação");

      const filtered = applications.filter(
        (app) => app.id !== selectedApplication?.id
      );

      // await deleteApplication(selectedApplication?.id);
      setApplications(filtered);

      removerItem(
        `@history_${selectedApplication.userId}_${selectedApplication.id}`
      );
      salvarItem(`@applications_${selectedUser?.id}`, filtered);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        selectedApplication,
        get applications() {
          if (!searchTerm && !filterTerm) return applications;
          return _filterApplications();
        },
        filterTerm,
        searchTerm,
        setSearchTerm,
        setFilterTerm,
        _resetApplications,
        _getApplicationDetails,
        _createApplication,
        _updateApplication,
        _deleteApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
