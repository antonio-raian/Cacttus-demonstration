import React from "react";
import Image from "next/image";
import {
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="justify-between items-end inline-flex w-full font-['Satoshi'] ">
      <Image
        className="hidden md:block -mr-9 z-50"
        src="/cacto_1.svg"
        alt="cactos"
        width={110}
        height={110}
      />
      <div className="w-full md:px-8 py-5 flex-col justify-center items-center inline-flex ">
        <div className="self-stretch text-center  text-sm font-bold tracking-widest">
          Desenvolvido por Antonio Raian Mendes
        </div>
        <div className="self-stretch p-2.5 md:px-10 justify-between items-center inline-flex map-2">
          <div className="self-stretch justify-start items-center md:gap-2 flex">
            <IconPhone className="w-4 h-4" />
            <div className="text-foreground text-xs font-bold tracking-wider">
              (11) 999 888 732
            </div>
          </div>
          <div className="justify-start items-center md:gap-2">
            <Link
              href="https://github.com/antonio-raian"
              target="_blank"
              className="text-foreground text-xs font-bold underline tracking-wider flex items-center"
            >
              <IconBrandGithubFilled className="w-5 h-5" />
              antonio-raian
            </Link>
          </div>
          <div className="h-5 justify-start items-center md:gap-2 ">
            <Link
              href="https://www.linkedin.com/in/antonio-raian-mendes-42887ba4/"
              target="_blank"
              className="text-foreground text-xs font-bold underline tracking-wider flex items-center"
            >
              <IconBrandLinkedin className="w-5 h-5" />
              Antonio Mendes
            </Link>
          </div>
        </div>
      </div>
      <Image
        className="hidden md:block -ml-12 z-50"
        src="/cacto_2.svg"
        alt="cactos"
        width={112}
        height={112}
      />
    </footer>
  );
};

export default Footer;
