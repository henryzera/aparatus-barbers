"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Home, CalendarDays, LogOut, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface SidebarMenuProps {
  children: React.ReactNode;
}

const SidebarMenu = ({ children }: SidebarMenuProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const categories = [
    "Cabelo",
    "Barba",
    "Acabamento",
    "Sombrancelha",
    "Massagem",
    "Hidratação",
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-[370px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-lg font-bold">Menu</h2>
        </div>

        {/* Separator */}
        <Separator />

        {/* User Section */}
        <div className="px-5">
          {user ? (
            // Logged in state
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="size-12">
                <AvatarImage src={user.image || ""} alt={user.name || ""} />
                <AvatarFallback>
                  {user.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-foreground text-base font-semibold">
                  {user.name}
                </p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
            </div>
          ) : (
            // Logged out state
            <div className="flex items-center justify-between">
              <p className="text-foreground text-base font-semibold">
                Olá. Faça seu login!
              </p>
              <Button
                onClick={handleLogin}
                className="rounded-full px-6 py-3"
                size="sm"
              >
                Login
                <LogIn className="size-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex flex-col">
          <Link
            href="/"
            className="hover:bg-accent flex items-center gap-3 rounded-full px-5 py-3 transition-colors"
          >
            <Home className="size-4" />
            <span className="text-foreground text-sm font-medium">Início</span>
          </Link>
          <Link
            href="/bookings"
            className="hover:bg-accent flex items-center gap-3 rounded-full px-5 py-3 transition-colors"
          >
            <CalendarDays className="size-4" />
            <span className="text-foreground text-sm font-medium">
              Agendamentos
            </span>
          </Link>
        </div>

        {/* Separator */}
        <div className="py-6">
          <Separator />
        </div>

        {/* Categories */}
        <div className="flex flex-col space-y-1">
          {categories.map((category) => (
            <div
              key={category}
              className="text-foreground hover:bg-accent rounded-full px-5 py-3 text-sm font-medium transition-colors"
            >
              {category}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="py-6">
          <Separator />
        </div>

        {/* Logout Button */}
        <button
          onClick={user ? handleLogout : undefined}
          disabled={!user}
          className="hover:bg-accent flex w-full items-center gap-3 rounded-full px-5 py-3 transition-colors disabled:cursor-not-allowed"
        >
          <LogOut className="size-4" />
          <span className="text-muted-foreground text-sm font-medium">
            Sair da conta
          </span>
        </button>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMenu;
