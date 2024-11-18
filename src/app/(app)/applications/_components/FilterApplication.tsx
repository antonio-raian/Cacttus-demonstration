"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTRACTS, WORK_TYPES, STATUS } from "@/core/constants";
import { useApplications } from "@/core/hooks";
import { IconX } from "@tabler/icons-react";
import React from "react";

const filtersSelect = [
  {
    name: "status",
    label: "Status",
    options: STATUS,
  },
  {
    name: "workStyle",
    label: "Modelo de Trabalho",
    options: WORK_TYPES,
  },
  {
    name: "contractType",
    label: "Tipo de Contrato",
    options: CONTRACTS,
  },
];

const FilterApplication = ({ showFilter }: { showFilter: boolean }) => {
  const { filterTerm, setFilterTerm } = useApplications();
  return (
    showFilter && (
      <div className="w-full flex flex-wrap md:flex-nowrap justify-center items-center gap-2 pb-3">
        {filtersSelect.map((filter, index) => (
          <div
            key={index}
            className="w-full flex justify-end items-center gap-2"
          >
            <Select
              value={filterTerm[filter.name]}
              onValueChange={(value) =>
                setFilterTerm({ ...filterTerm, [filter.name]: value })
              }
            >
              <SelectTrigger className="capitalize">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent className="capitalize">
                {filter.options.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <IconX
              className={`${
                filterTerm[filter.name] ? "block" : "hidden"
              } h-4 w-4 cursor-pointer`}
              onClick={() => {
                setFilterTerm({ ...filterTerm, [filter.name]: "" });
              }}
            />
          </div>
        ))}
      </div>
    )
  );
};

export default FilterApplication;
