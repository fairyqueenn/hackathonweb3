import Link from "next/link";
import { Logo } from "./logo";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-headline">CriptoFund</span>
            </Link>
            <p className="text-foreground/70 text-sm">
              Decentralized crowdfunding for a better future.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-foreground/60 hover:text-primary"><Github size={20} /></Link>
              <Link href="#" className="text-foreground/60 hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" className="text-foreground/60 hover:text-primary"><Linkedin size={20} /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Campaigns</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-foreground">Technology</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-foreground">Art</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-foreground">Community</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-foreground">Health</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-foreground">How it Works</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-foreground">About Us</Link></li>
              <li><Link href="/login" className="text-sm text-foreground/70 hover:text-foreground">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} CriptoFund. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
