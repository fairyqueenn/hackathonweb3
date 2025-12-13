import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function BitcoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(props.className)}
      {...props}
    >
      <path d="M8.33 8H15.5a2.5 2.5 0 0 1 0 5H11.5a2.5 2.5 0 0 0 0 5H15.7a2.5 2.5 0 0 0 0-5" />
      <path d="M12 4v2" />
      <path d="M12 18v2" />
      <path d="M18.7 16H18.71" />
      <path d="M18.7 8H18.71" />
      <path d="M5.3 8H5.31" />
      <path d="M5.3 16H5.31" />
    </svg>
  );
}
