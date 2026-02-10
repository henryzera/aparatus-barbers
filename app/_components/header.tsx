"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import SidebarMenu from "./sidebar-menu";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/Logo.svg" alt="Logo" width={100} height={26.09} />
      <SidebarMenu>
        <Button variant="outline" size="icon">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SidebarMenu>
    </header>
  );
};

export default Header;
