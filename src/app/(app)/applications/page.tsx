import React from "react";
import ListApplication from "./_components/ListApplication";
import HeaderApplication from "./_components/HeaderApplication";

const Applications = () => {
  return (
    <div className="flex flex-col w-full max-h-svh pb-3 md:pl-3 overflow-y-auto">
      {/* Barra de pesquisa */}
      <HeaderApplication />
      {/* Tabela de candidaturas */}
      <ListApplication />
    </div>
  );
};

export default Applications;
