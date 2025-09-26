import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(
      "relative flex items-center py-1.5 pr-2 pl-8 text-sm rounded-sm outline-none transition-colors cursor-default",
      "select-none focus:text-zinc-900 focus:bg-zinc-100 data-[disabled]:opacity-50",
      "data-[disabled]:pointer-events-none dark:focus:text-zinc-50 dark:focus:bg-zinc-800",
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex justify-center items-center w-3.5 h-3.5">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="w-4 h-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden p-1 text-zinc-950 bg-white rounded-md border border-zinc-200 shadow-md",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in",
        "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:text-zinc-50 dark:bg-zinc-950",
        "dark:border-zinc-800",
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "relative flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm outline-none transition-colors cursor-default",
      "select-none focus:text-zinc-900 focus:bg-zinc-100 data-[disabled]:opacity-50",
      "data-[disabled]:pointer-events-none [&>svg]:shrink-0 [&>svg]:size-4 dark:focus:text-zinc-50",
      "dark:focus:bg-zinc-800",
      inset && "pl-8",
      className,
    )}
    ref={ref}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    ref={ref}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "relative flex items-center py-1.5 pr-2 pl-8 text-sm rounded-sm outline-none transition-colors cursor-default",
      "select-none focus:text-zinc-900 focus:bg-zinc-100 data-[disabled]:opacity-50",
      "data-[disabled]:pointer-events-none dark:focus:text-zinc-50 dark:focus:bg-zinc-800",
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex justify-center items-center w-3.5 h-3.5">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="w-2 h-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    className={cn("h-px -mx-1 my-1 bg-zinc-100 dark:bg-zinc-800", className)}
    ref={ref}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (<span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden p-1 text-zinc-950 bg-white rounded-md border border-zinc-200 shadow-lg",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in",
      "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:text-zinc-50 dark:bg-zinc-950",
      "dark:border-zinc-800",
      className,
    )}
    ref={ref}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm outline-none cursor-default select-none",
      "focus:bg-zinc-100 data-[state=open]:bg-zinc-100 [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:pointer-events-none",
      "dark:focus:bg-zinc-800 dark:data-[state=open]:bg-zinc-800",
      inset && "pl-8",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

export {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
};
