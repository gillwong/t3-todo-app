import { Menu } from "lucide-react";
import Link from "next/link";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import NavButton from "./nav-button";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function NavBar({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between border-b border-slate-200 bg-white/60 px-4 py-2 backdrop-blur-lg",
        className,
      )}
      {...props}
    >
      <h1 className="text-2xl font-bold">
        <Link className="underline-offset-2 hover:underline" href="/">
          Next Todo App
        </Link>
      </h1>
      <Sheet>
        <SheetTrigger className="relative" asChild>
          <Button variant="outline" size="icon" className="aspect-square">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigate</SheetTitle>
          </SheetHeader>
          <Separator className="my-3" />
          <div className="space-y-0">
            <SheetClose asChild>
              <NavButton href="/">Home</NavButton>
            </SheetClose>
            <SheetClose asChild>
              <NavButton href="/new">New</NavButton>
            </SheetClose>
            <SheetClose asChild>
              <NavButton href="/completed">Completed</NavButton>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
