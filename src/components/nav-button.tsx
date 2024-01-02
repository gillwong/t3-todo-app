import { type Url } from "url";
import { Button, type ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type NavButtonProps = {
  href: string | Url;
} & ButtonProps;

export default function NavButton({
  className,
  href,
  children,
}: NavButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start", className)}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
