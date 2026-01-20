"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

export const DialogOverlay = React.forwardRef((props, ref) => {
  const { className = "", ...rest } = props

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={`fixed inset-0 z-50 bg-black/80
        data-[state=open]:animate-in
        data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0
        ${className || ""}`}
      {...rest}
    />
  )
})

export const DialogContent = React.forwardRef((props, ref) => {
  const { className = "", children, ...rest } = props

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        onPointerDownOutside={(e) => e.preventDefault()}
        className={`fixed left-[50%] top-[50%] z-50 flex w-full max-w-lg flex-col translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-[90vh]
          ${className || ""}`}
        {...rest}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute right-4 top-4 rounded-sm opacity-70
          ring-offset-background transition-opacity
          hover:opacity-100
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          disabled:pointer-events-none
          data-[state=open]:bg-accent
          data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})

export const DialogHeader = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 p-6 pb-4 text-center sm:text-left ${className || ""}`}
    {...props}
  />
)

export const DialogFooter = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-4 ${className || ""}`}
    {...props}
  />
)

export const DialogTitle = React.forwardRef((props, ref) => {
  const { className = "", ...rest } = props

  return (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className || ""}`}
      {...rest}
    />
  )
})

export const DialogDescription = React.forwardRef((props, ref) => {
  const { className = "", ...rest } = props

  return (
    <DialogPrimitive.Description
      ref={ref}
      className={`text-sm text-muted-foreground ${className || ""}`}
      {...rest}
    />
  )
})
