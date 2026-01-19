import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "../../hooks/use-mobile"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Separator } from "../../components/ui/separator"
import { Sheet, SheetContent } from "../../components/ui/sheet"
import { Skeleton } from "../../components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"

/* ------------------------------------------------------------------ */
/* constants */
/* ------------------------------------------------------------------ */

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

/* ------------------------------------------------------------------ */
/* context */
/* ------------------------------------------------------------------ */

const SidebarContext = createContext(null)

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider")
  return ctx
}

/* ------------------------------------------------------------------ */
/* provider */
/* ------------------------------------------------------------------ */

export function SidebarProvider({
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)
  const [openInternal, setOpenInternal] = useState(defaultOpen)

  const open =
    typeof controlledOpen === "boolean"
      ? controlledOpen
      : openInternal

  function setOpen(value) {
    const next = typeof value === "function" ? value(open) : value

    if (onOpenChange) onOpenChange(next)
    else setOpenInternal(next)

    document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }

  function toggleSidebar() {
    isMobile
      ? setOpenMobile(v => !v)
      : setOpen(v => !v)
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, isMobile])

  const state = open ? "expanded" : "collapsed"

  const value = useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, open, isMobile, openMobile])

  return (
    <SidebarContext.Provider value={value}>
      <TooltipProvider delayDuration={0}>
        <div
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/* Sidebar */
/* ------------------------------------------------------------------ */

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div className={`
        flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground
        ${className}
      `} {...props}>
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          side={side}
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
        >
            <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer hidden md:block text-sidebar-foreground"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
        <div
          className={`duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear
            group-data-[collapsible=offcanvas]:w-0
            group-data-[side=right]:rotate-180
            ${(variant === "floating" || variant === "inset")
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"}
            `}
        />
        <div
          className={`duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex
            ${side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]"}
            ${variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l"}
            ${className || ""}
          `}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Trigger */
/* ------------------------------------------------------------------ */

export function SidebarTrigger(props) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeft />
    </Button>
  )
}

/* ------------------------------------------------------------------ */
/* Inset */
/* ------------------------------------------------------------------ */

export function SidebarInset({ className, ...props }) {
  return (
    <main
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* SIMPLE UI HELPERS */
/* ------------------------------------------------------------------ */

export const SidebarHeader = ({ className, ...props }) =>
  <div data-sidebar="header" className={`flex flex-col gap-2 p-2 ${className || ""}`} {...props} />

export const SidebarFooter = ({ className, ...props }) =>
  <div data-sidebar="footer" className={`flex flex-col gap-2 p-2 ${className}`} {...props} />

export const SidebarSeparator = ({ className, ...props }) =>
  <div data-sidebar="separator" className={`mx-2 w-auto bg-sidebar-border ${className || ""}`} {...props}/>

export const SidebarContent = ({ className, ...props }) =>
  <div data-sidebar="content" className={`flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden`} {...props} />
  
export const SidebarGroup = ({ className, ...props }) => 
  <div data-sidebar="group" className={`relative flex w-full min-w-0 flex-col p-2 ${className}`} {...props}/>

export const SidebarMenu = ({ className, ...props }) =>
  <ul data-sidebar="menu" className={`flex w-full min-w-0 flex-col gap-1 ${className}`} {...props} />

export const SidebarMenuItem = ({ className, ...p }) =>
  <li data-sidebar="menu-item" className={`group/menu-item relative ${className}`} {...p} />


/* ------------------------------------------------------------------ */
/* Menu Button */
/* ------------------------------------------------------------------ */

const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent"
)

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button"
  const { state, isMobile } = useSidebar()

  const button = (
    <Comp
      data-active={isActive}
      data-sidebar="menu-button"
      data-size={size}
      className={`${sidebarMenuButtonVariants({variant, size})} ${className || ""}`}
      {...props}
    />
  )

  if (!tooltip) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}