import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b px-6">
        <span className="leading-none rainbow-text flex items-center" style={{fontFamily: "'Outfit', sans-serif", fontSize: '33px', fontWeight: '900'}}>
          <span style={{letterSpacing: '-0.02em'}}>SH</span>
          <span style={{letterSpacing: '-0.08em', marginLeft: '2px', marginRight: '2px'}}>OO</span>
          <span style={{letterSpacing: '-0.02em'}}>BU</span>
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive 
                      ? "bg-sidebar-accent text-primary" 
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground transition-all">
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
