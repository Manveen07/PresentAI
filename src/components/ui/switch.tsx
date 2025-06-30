"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils"; // Ensure your `cn` utility works for conditional classNames

// "dark:data-[state=unchecked]:bg-gray-700";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    {...props}
    className={cn(
      "relative flex h-10 w-20 items-center justify-between rounded-full shadow-md transition-colors",
      // Background dynamically changes based on theme; now uses off-white in light mode
      "data-[state=checked]:bg-gray-100 data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-black",
      "dark:data-[state=unchecked]:bg-black",

      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
  >
    {/* Thumb (White Circle) */}
    <SwitchPrimitives.Thumb
      className={cn(
        "block h-8 w-8 rounded-full shadow-lg ring-0 transition-transform",
        // Thumb remains white to contrast against off-white background
        "bg-white dark:bg-gray-400",
        "data-[state=checked]:translate-x-10 data-[state=unchecked]:translate-x-0"
      )}
    />
    {/* Moon Icon - Visible in unchecked (dark mode) state */}
    <Moon
      className={cn(
        "absolute h-5 w-5 left-2 stroke-gray-600 transition-opacity duration-300 ease-in-out",
        "data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100"
      )}
    />
    {/* Sun Icon - Visible in checked (light mode) state */}
    <Sun
      className={cn(
        "absolute h-5 w-5 right-2 stroke-gray-600 transition-opacity duration-300 ease-in-out",
        "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
      )}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = "Switch";

export { Switch };
