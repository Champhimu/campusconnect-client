"use client";

import React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils"; // your classnames helper

// ==================== Toast Provider ====================
export function ToastProvider({ children }) {
  return <ToastPrimitives.Provider>{children}</ToastPrimitives.Provider>;
}

// ==================== Toast Viewport ====================
export function ToastViewport(props) {
  return (
    <ToastPrimitives.Viewport
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        props.className
      )}
      {...props}
    />
  );
}

// ==================== Toast Variants ====================
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all " +
    "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] " +
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none " +
    "data-[state=open]:animate-in data-[state=closed]:animate-out " +
    "data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full " +
    "data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ==================== Toast Component ====================
export function Toast({ className, variant, children, ...props }) {
  return (
    <ToastPrimitives.Root className={cn(toastVariants({ variant }), className)} {...props}>
      {children}
    </ToastPrimitives.Root>
  );
}

// ==================== Toast Subcomponents ====================
export function ToastTitle(props) {
  return (
    <ToastPrimitives.Title className={cn("text-sm font-semibold", props.className)} {...props} />
  );
}

export function ToastDescription(props) {
  return (
    <ToastPrimitives.Description
      className={cn("text-sm opacity-90", props.className)}
      {...props}
    />
  );
}

export function ToastClose(props) {
  return (
    <ToastPrimitives.Close
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground " +
          "focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 " +
          "group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
        props.className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  );
}

export function ToastAction({ className, ...props }) {
  return (
    <ToastPrimitives.Action
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors " +
          "hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
          "group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground " +
          "group-[.destructive]:focus:ring-destructive",
        className
      )}
      {...props}
    />
  );
}
