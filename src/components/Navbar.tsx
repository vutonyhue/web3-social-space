import { Link, useLocation } from "react-router-dom";
import { Home, Users, UserCircle, Wallet, Search, Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { icon: Home, label: "Feed", path: "/" },
    { icon: Users, label: "Friends", path: "/friends" },
    { icon: UserCircle, label: "Profile", path: "/profile" },
    { icon: Wallet, label: "Wallet", path: "/wallet" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-glow">
              <span className="text-xl font-bold text-primary-foreground">CF</span>
            </div>
            <span className="hidden text-xl font-heading font-bold text-primary sm:block">
              Camly Fun
            </span>
          </Link>

          {/* Search */}
          <div className="relative hidden max-w-md flex-1 px-8 md:block">
            <Search className="absolute left-11 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="w-full pl-9"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button className="ml-2 gap-2 bg-primary hover:bg-primary-light">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Đăng nhập</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
