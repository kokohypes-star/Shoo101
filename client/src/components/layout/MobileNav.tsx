import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  ShoppingCart, 
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useColor, colorPalettes } from "@/contexts/ColorContext";

const mobileNavigation = [
  { name: "Home", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "More", href: "/settings", icon: MoreHorizontal },
];

export function MobileNav() {
  const [location] = useLocation();
  const { brandColor } = useColor();
  const brandColorValue = colorPalettes[brandColor].hsl;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background px-6 pb-6 pt-2 md:hidden">
      <nav className="flex justify-between">
        {mobileNavigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg p-2 text-xs font-medium transition-all",
                  isActive 
                    ? "text-muted-foreground hover:text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                style={isActive ? { color: `hsl(${brandColorValue})` } : {}}
              >
                <item.icon 
                  className="h-6 w-6" 
                  style={isActive ? { 
                    color: `hsl(${brandColorValue})`,
                  } : {}}
                />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
