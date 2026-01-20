import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "../../lib/utils";


const Label = React.forwardRef(({ className, children, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {children}{required && <span className="text-destructive ml-0.5">*</span>}
  </LabelPrimitive.Root>
))

Label.displayName = "Label"

export { Label }
