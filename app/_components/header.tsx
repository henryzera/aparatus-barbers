import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
        <header className="flex items-center justify-between px-5 py-6 bg-white">
            <Image src="/Logo.svg" alt="Logo" width={100} height={26.09} />
            <Button variant="outline" size="icon">
                <MenuIcon className="w-6 h-6" />
            </Button>
        </header>
    );
};

export default Header;
