import React from "react";
import Image from "next/image";
import Cactos from "./_components/Cactos";

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="container min-h-screen flex flex-col px-2 gap-7 py-10 items-center font-['Satoshi'] md:px-0 ">
      <div className="flex justify-between   items-center gap-7">
        <div className="flex justify-center w-auto  h-[60px] md:h-[80px] lg:h-[100px] xl:h-[120px]">
          <Image
            src="/logo.svg"
            alt="logo"
            width={352}
            height={120}
            priority={true}
          />
        </div>
      </div>
      <Cactos> {children} </Cactos>
    </section>
  );
};

export default LoginLayout;
