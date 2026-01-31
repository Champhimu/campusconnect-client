import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useId, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Loader2 } from "lucide-react";
// import { useToast } from "../../hooks/use-toast";
import { Label } from "../ui/label";
import { createTPO } from "../../redux/slices/admin/userMgmtSlice";
import { useDispatch } from "react-redux";

const tpoSchema = z.object({
  name: z.string().min(1, "TPO name is required."),
  email: z.string().email("Invalid email address."),
  status: z.enum(["active", "inactive"]),
});

export function TpoDialog({ open, onOpenChange, mode, tpo, onSuccess }) {
  const isViewMode = mode === "view";
 const title = mode === "add" ? "Add New TPO" : "View TPO Profile"
  const description =
    mode === "add"
      ? "Enter the details for the new TPO."
      : "TPO user details."

  const formId = useId();
  const [isPending] = useTransition();
  // const { toast } = useToast();
  const dispatch = useDispatch();
  
  const form = useForm({
    resolver: zodResolver(tpoSchema),
    defaultValues: {
      name: tpo?.name || "",
      email: tpo?.email || "",
      status: tpo?.status?.toLowerCase() || "active",
    },
  });

  useEffect(() => {
    form.reset({
      name: tpo?.name || "",
      email: tpo?.email || "",
      status: tpo?.status?.toLowerCase() || "active",
    });
  }, [tpo, form]);

  const onSubmit = async(data) => {
    await dispatch(createTPO(data)).unwrap();
    alert("TPO Added");
    onSuccess()
    // startTransition(() => {
    //   setTimeout(() => {
    //     toast({ title: "Success", description: `TPO ${data.name} saved!` });
    //     onSuccess();
    //   }, 1000);
    // });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="flex-1 overflow-y-auto thin-scrollbar">
            <div className="grid gap-4 px-6 py-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel required>TPO Name</FormLabel>
                  <FormControl><Input {...field} readOnly={isViewMode} placeholder="e.g., Jane Doe" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl><Input {...field} type="email" readOnly={isViewMode} placeholder="e.g., jane.doe@example.com" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormItem>
                <Label>Department</Label>
                <Input defaultValue={"TPO"} readOnly />
              </FormItem>

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Status</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4" disabled={isViewMode}>
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="active" /></FormControl><Label className="font-normal">Active</Label></FormItem>
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="inactive" /></FormControl><Label className="font-normal">Inactive</Label></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </form>
        </Form>
        {!isViewMode && (
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" form={formId} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save TPO
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog >
  );
}
