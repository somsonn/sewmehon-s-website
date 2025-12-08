import { Palette, Moon, Sun, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === "light" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark (Teal)</span>
          {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("blue")}>
          <div className="mr-2 h-4 w-4 rounded-full bg-blue-500" />
          <span>Blue</span>
          {theme === "blue" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("purple")}>
          <div className="mr-2 h-4 w-4 rounded-full bg-purple-500" />
          <span>Purple</span>
          {theme === "purple" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("green")}>
          <div className="mr-2 h-4 w-4 rounded-full bg-green-500" />
          <span>Green</span>
          {theme === "green" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("orange")}>
          <div className="mr-2 h-4 w-4 rounded-full bg-orange-500" />
          <span>Orange</span>
          {theme === "orange" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
