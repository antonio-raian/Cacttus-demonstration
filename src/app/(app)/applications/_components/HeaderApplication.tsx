"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import FilterApplication from "./FilterApplication";
import CreateApplication from "./CreateApplication";
import { useApplications, useUser } from "@/core/hooks";

const HeaderApplication = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { loading } = useUser();
  const { searchTerm, setFilterTerm, setSearchTerm } = useApplications();

  if (loading)
    return (
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-1 gap-2">
          <Skeleton className="w-full h-10" />

          <div className="w-full flex items-center justify-end gap-2">
            <Skeleton className="w-full max-w-2/3 h-10" />
            <Skeleton className="w-full max-w-9 h-10" />
            <Skeleton className="w-full max-w-9 h-10" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col w-full gap-1 ">
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-1 gap-2">
        {/* Titulo */}
        <div className="w-full">
          <h1 className="w-full text-2xl font-bold mb-2 text-center md:text-left">
            Lista de Candidaturas
          </h1>
        </div>

        {/* Botoes */}
        <div className="w-full flex flex-col md:flex-row items-center justify-end gap-2">
          <CreateApplication className="w-full" />
          <div className="w-full md:w-1/3 flex items-center justify-center gap-2 p-1">
            <Button
              className="w-full h-full  flex items-center justify-center gap-2"
              variant={showSearch ? "destructive" : "outline"}
              onClick={() => {
                setShowSearch(!showSearch);
                if (showFilter) setShowFilter(!showFilter);
              }}
            >
              <IconSearch className="h-4 w-4" />
            </Button>
            <Button
              className="w-full h-full  flex items-center justify-center gap-2"
              variant={showFilter ? "destructive" : "outline"}
              onClick={() => {
                setShowFilter(!showFilter);
                if (showSearch) setShowSearch(!showSearch);
                setFilterTerm({});
              }}
            >
              <IconFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Pesquisar candidaturas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`${showSearch ? "block" : "hidden"} w-full`}
      />

      {/* Filtros */}
      <FilterApplication showFilter={showFilter} />
    </div>
  );
};

export default HeaderApplication;
