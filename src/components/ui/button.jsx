import * as React from "react";
import { cn } from "../../lib/utils";

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center rounded-md bg-black px-4 py-2 text-white",
        className
      )}
      {...props}
    />
  );
}
