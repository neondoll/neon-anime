import Paths from "@/paths";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle.tsx";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 -mb-px bg-white/75 border-b border-gray-200 backdrop-blur dark:bg-gray-900/75 dark:border-gray-800">
      <div className="container flex justify-between items-center gap-3 mx-auto p-4">
        <div className="flex justify_start items-center gap-1.5 lg:flex-1">
          <Link
            className="flex-shrink-0 flex items-end gap-1.5 text-xl font-bold text-gray-900 dark:text-white"
            to={Paths.ROOT}
          >
            <span className="text-primary">Neon</span>
            Anime
          </Link>
        </div>
        <div className="flex justify-end items-center gap-1.5 lg:flex-1">
          <ModeToggle />
          <Button size="icon" variant="outline">
            <Menu className="size-[1.2rem]" />
          </Button>
        </div>
      </div>
    </header>
  );
}
