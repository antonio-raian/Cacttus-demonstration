import Image from "next/image";
import React from "react";

const Cactos = ({
  children,
  props,
}: Readonly<{
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
}>) => {
  return (
    <>
      <div
        {...props}
        className={
          "flex w-full min-h-[550px] items-end justify-center " +
          props?.className
        }
      >
        <Image
          className="hidden md:block -mr-9 z-50"
          src="/cacto_1.svg"
          alt="cactos"
          width={162}
          height={162}
        />
        <div className="flex min-w-[400px] min-h-[550px] h-full justify-center items-center">
          {children}
        </div>
        <Image
          className="hidden md:block -ml-12 z-50"
          src="/cacto_2.svg"
          alt="cactos"
          width={162}
          height={162}
        />
      </div>
      <div className="bottom-0 flex justify-center items-end md:hidden">
        <Image src="/cactos_sm.svg" alt="cactos" width={239} height={162} />
      </div>
    </>
  );
};

export default Cactos;
