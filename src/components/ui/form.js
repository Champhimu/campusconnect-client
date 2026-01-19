import React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form"

import { Label } from "./label" // relative path instead of @/components/ui/label
import { cn } from "../../lib/utils"   


/* ---------------- FORM ROOT ---------------- */
const Form = FormProvider

/* ---------------- CONTEXT ---------------- */
const FormFieldContext = React.createContext({})
const FormItemContext = React.createContext({})

/* ---------------- FORM FIELD ---------------- */
const FormField = (props) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/* ---------------- USE FORM FIELD HOOK ---------------- */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext?.name) {
    throw new Error("useFormField must be used within <FormField>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
  }
}

/* ---------------- FORM ITEM ---------------- */
const FormItem = React.forwardRef(({ className = "", ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={`space-y-2 ${className}`} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

/* ---------------- FORM LABEL ---------------- */
const FormLabel = React.forwardRef(({ className = "", ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={`${error ? "text-destructive" : ""} ${className}`}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

/* ---------------- FORM CONTROL ---------------- */
const FormControl = React.forwardRef((props, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

/* ---------------- FORM DESCRIPTION ---------------- */
const FormDescription = React.forwardRef(({ className = "", ...props }, ref) => {
  const { formDescriptionId } = useFormField()
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

/* ---------------- FORM MESSAGE ---------------- */
const FormMessage = React.forwardRef(({ className = "", children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message || "") : children

  if (!body) return null

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={`text-sm font-medium text-destructive ${className}`}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

/* ---------------- EXPORTS ---------------- */
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
}
