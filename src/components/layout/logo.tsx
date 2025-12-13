import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", props.className)}
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
      <path d="M12 18a6 6 0 0 1-6-6h0a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6h0a6 6 0 0 1-6 6Z" />
      <path d="M12 6V1a7 7 0 0 1 7 7h-1" />
      <path d="M12 12c-3 0-3 4-6 4" />
      <path d="M12 12c3 0 3 4 6 4" />
    </svg>
  );
}
