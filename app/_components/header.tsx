"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const { data: session } = authClient.useSession();
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  const handleLogout = async () => {
    await authClient.signOut();
  };
  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/Logo.svg" alt="Logo" width={100} height={26.09} />
      <div className="flex items-center gap-2">
        {session ? (
          <div className="flex items-center gap-2">
            <h1>{session.user?.name}</h1>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOutIcon className="h-6 w-6" />
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="icon" onClick={handleLogin}>
            <LogInIcon className="h-6 w-6" />
          </Button>
        )}
        <Button variant="outline" size="icon">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
