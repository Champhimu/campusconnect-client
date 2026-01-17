"use client"

import * as React from "react"
//import { Slot } from "@radix-ui/react-slot"
//import { cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "../../hooks/use-mobile"
//import { cn } from "../../lib/utils"

import { Button } from "./button"
import { Input } from "./input"
import { Separator } from "./separator"
import { Sheet, SheetContent } from "./sheet"
import { Skeleton } from "./skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

/* ---------------- CONTEXT ---------------- */

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }
  return context
}

/* ---------------- PROVIDER ---------------- */

const SidebarProvider = React.forwardRef(function SidebarProvider(
  {
    defaultOpen = true,
    open: openProp,
    onOpenChange,
    className,
    style,
    children,
    ...props
  },
  ref
) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [_open, _setOpen] = React.useState(defaultOpen)

  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value) => {
      const next = typeof value === "function" ? value(open) : value
      onOpenChange ? onOpenChange(next) : _setOpen(next)

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [open, onOpenChange]
  )

  const toggleSidebar = React.useCallback(() => {
    isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o)
  }, [isMobile, setOpen])

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const value = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, isMobile, openMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>
      <TooltipProvider delayDuration={0}>
        <div
          ref={ref}
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={`group/sidebar-wrapper flex min-h-svh w-full ${className || ""}`}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
})

/* ---------------- SIDEBAR ---------------- */

const Sidebar = React.forwardRef(function Sidebar(
  {
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  },
  ref
) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        ref={ref}
        className={`flex h-full w-[--sidebar-width] flex-col bg-sidebar ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side={side}
          className="w-[--sidebar-width] bg-sidebar p-0"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
        >
          {children}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div ref={ref} className="peer hidden md:block" data-state={state}>
      <div
        className={`fixed inset-y-0 z-10 flex w-[--sidebar-width] bg-sidebar ${
          side === "left" ? "left-0" : "right-0"
        } ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    </div>
  )
})

/* ---------------- TRIGGER ---------------- */

const SidebarTrigger = React.forwardRef(function SidebarTrigger(
  { className, onClick, ...props },
  ref
) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={`h-7 w-7 ${className || ""}`}
      onClick={(e) => {
        onClick?.(e)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
    </Button>
  )
})

/* ---------------- SIMPLE EXPORTS ---------------- */

const SidebarContent = ({ className, ...props }) => (
  <div className={`flex flex-1 flex-col ${className || ""}`} {...props} />
)

const SidebarHeader = ({ className, ...props }) => (
  <div className={`p-2 ${className || ""}`} {...props} />
)

const SidebarFooter = ({ className, ...props }) => (
  <div className={`p-2 ${className || ""}`} {...props} />
)

const SidebarInset = ({ className, ...props }) => (
  <main className={`flex-1 ${className || ""}`} {...props} />
)

const SidebarMenu = ({ className, ...props }) => (
  <ul className={`flex flex-col gap-1 ${className || ""}`} {...props} />
)

const SidebarMenuItem = ({ className, ...props }) => (
  <li className={className} {...props} />
)

const SidebarMenuButton = ({ className, ...props }) => (
  <button
    className={`w-full rounded-md px-2 py-1 hover:bg-sidebar-accent ${className || ""}`}
    {...props}
  />
)

const SidebarSeparator = (props) => <Separator {...props} />
const SidebarInput = (props) => <Input {...props} />

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInput,
  useSidebar,
}
