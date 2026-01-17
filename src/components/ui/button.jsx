// import * as React from "react";
// import { cn } from "../../lib/utils";

// export function Button({ className, ...props }) {
//   return (
//     <button
//       className={cn(
//         "inline-flex items-center rounded-md bg-black px-4 py-2 text-white",
//         className
//       )}
//       {...props}
//     />
//   );
// }


// src/components/ui/button.jsx

import React from "react";
import { cn } from "../../lib/utils";

/* ---------------------------------- */
/* buttonVariants helper               */
/* ---------------------------------- */

export function buttonVariants({ variant = "default", size = "default" } = {}) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return cn(base, variants[variant], sizes[size]);
}

/* ---------------------------------- */
/* Button Component                    */
/* ---------------------------------- */

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
