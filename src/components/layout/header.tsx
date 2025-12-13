"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wallet, Rocket, Bot, Home, User } from "lucide-react";
import { Logo } from "./logo";
import { useState, useEffect } from "react";
import { useWallet } from "@/hooks/use-wallet";

const navLinks = [
  { href: "/", label: "Discover", icon: Home },
  { href: "/create-campaign", label: "Create Campaign", icon: Rocket },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/dashboard", label: "Dashboard", icon: User },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { account, connectWallet, disconnectWallet } = useWallet();

  const handleConnect = () => {
    if (account) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  return (
    <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-headline hidden sm:inline">CriptoFund</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button onClick={handleConnect}>
            <Wallet className="mr-2 h-4 w-4" />
            {account ? truncateAddress(account) : 'Connect Wallet'}
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="p-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-8">
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="font-headline">CriptoFund</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
