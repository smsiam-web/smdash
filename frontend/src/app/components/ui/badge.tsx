import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        default_green:
          "border-transparent bg-green-600 text-white hover:bg-green-500",
        default_indigo:
          "border-transparent bg-indigo-600 text-white hover:bg-indigo-500",
        default_violet:
          "border-transparent bg-violet-600 text-white hover:bg-violet-500",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        secondary_green:
          "border-transparent bg-green-100 text-green-600 hover:bg-green-200",
          secondary_lime:
          "border-transparent bg-lime-100 text-lime-600 hover:bg-lime-200",
        secondary_orange:
          "border-transparent bg-orange-100 text-orange-600 hover:bg-orange-200",
        secondary_blue:
          "border-transparent bg-blue-100 text-blue-600 hover:bg-blue-200",
        secondary_violet:
          "border-transparent bg-violet-100 text-violet-600 hover:bg-violet-200",
        secondary_indigo:
          "border-transparent bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
        secondary_cyan:
          "border-transparent bg-cyan-100 text-cyan-600 hover:bg-cyan-200",
        secondary_red:
          "border-transparent bg-red-100 text-red-600 hover:bg-red-200",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
