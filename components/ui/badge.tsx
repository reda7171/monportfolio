import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("badge", {
  variants: {
    variant: {
      default:   "badge-primary",
      success:   "badge-success",
      warning:   "badge-warning",
      error:     "bg-[hsl(var(--error)/.12)] text-[hsl(var(--error))] border border-[hsl(var(--error)/.2)]",
      outline:   "border border-[hsl(var(--border-strong))] text-[hsl(var(--foreground-2))]",
      secondary: "bg-[hsl(var(--secondary)/.1)] text-[hsl(var(--secondary))] border border-[hsl(var(--secondary)/.2)]",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
