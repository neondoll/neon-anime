import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap rounded-md transition-colors",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none",
    "disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg]:size-4 dark:focus-visible:ring-zinc-300",
  ],
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs rounded-md",
        lg: "h-10 px-8 rounded-md",
        icon: "w-9 h-9",
      },
      variant: {
        default: [
          "text-zinc-50 bg-zinc-900 shadow hover:bg-zinc-900/90 dark:text-zinc-900 dark:bg-zinc-50",
          "dark:hover:bg-zinc-50/90",
        ],
        destructive: [
          "text-zinc-50 bg-red-500 shadow-sm hover:bg-red-500/90 dark:text-zinc-50 dark:bg-red-900",
          "dark:hover:bg-red-900/90",
        ],
        outline: [
          "bg-white border border-zinc-200 shadow-sm hover:text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-950",
          "dark:border-zinc-800 dark:hover:text-zinc-50 dark:hover:bg-zinc-800",
        ],
        secondary: [
          "text-zinc-900 bg-zinc-100 shadow-sm hover:bg-zinc-100/80 dark:text-zinc-50 dark:bg-zinc-800",
          "dark:hover:bg-zinc-800/80",
        ],
        ghost: "hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-50 dark:hover:bg-zinc-800",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
      },
    },
    defaultVariants: { size: "default", variant: "default" },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />);
});
Button.displayName = "Button";

export { Button, buttonVariants };
