import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function EthereumIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(props.className)}
      {...props}
    >
      <path d="M12 1.75l-6.25 10.5L12 17.5l6.25-5.25L12 1.75zM5.75 13.5L12 22.25l6.25-8.75L12 17.5l-6.25-4z" />
    </svg>
  );
}
