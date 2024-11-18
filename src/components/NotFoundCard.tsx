import React from "react";
import NotFoundSvg from "./graphics/notFoundSVG";

interface NotFoundCardProps {
  title?: string;
  description?: string;
}

const NotFoundCard = ({ title, description }: NotFoundCardProps) => {
  return (
    <div className="inline-flex rounded-2xl flex-col justify-center items-center px-5 md:py-3 font-['Satoshi'] md:shadow-[-9px_9px_4px_0px_rgba(0,0,0,0.25)] bg-border/50 w-full py-10 md:w-1/2">
      <NotFoundSvg />
      <div className="text-center max-w-[280px]">
        <h1 className="text-2xl font-bold mb-2 uppercase">
          {title || "Página não encontrada"}
        </h1>
        <p className="text-sm font-medium">
          {description || "A página que você tentou acessar não existe."}
        </p>
      </div>
    </div>
  );
};

export default NotFoundCard;
