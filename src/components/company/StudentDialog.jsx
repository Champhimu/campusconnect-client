import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useId, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Loader2 } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import branches from '../../lib/branches.json';
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { createStudent, updateStudent } from "../../redux/slices/admin/userMgmtSlice";

const studentSchema = z.object({
  name: z.string().min(1),
  regNo: z.string().min(1),
  email: z.string().email(),
  branch: z.string().min(1),
  batch: z.string().min(4).max(4),
  status: z.enum(["active", "inactive"]),
});

export function StudentDialog({ open, onOpenChange, mode, student, onSuccess }) {
  const dispatch = useDispatch();
  const isViewMode = mode === "view"

  const title =
    mode === "add"
      ? "Add New Student"
      : mode === "edit"
        ? "Update Student Profile"
        : "View Student Profile"

  const description =
    mode === "add"
      ? "Enter the details for the new student."
      : "View or modify student details."

  const formId = useId();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: student?.userId.name || "",
      regNo: student?.registrationNumber || "",
      email: student?.userId.email || "",
      branch: student?.branch || "",
      batch: student?.academicYear || "",
      status: "active",
    },
  });

  useEffect(() => {
    form.reset({
      name: student?.userId.name || "",
      regNo: student?.registrationNumber || "",
      email: student?.userId.email || "",
      branch: student?.branch || "",
      batch: student?.academicYear || "",
      status: "active",
    });
  }, [student, form]);

  const onSubmit = (data) => {
    console.log("Form Data:", student.userId);
    const payload = {
    name: data.name,
    registrationNumber: data.regNo,
    email: data.email,
    branch: data.branch,
    academicYear: data.batch,
    isActive: data.status === "active",
  };

  startTransition(() => {
    if (mode === "add") {
      dispatch(createStudent(payload))
        .unwrap()
        .then(() => {
          toast({ title: "Success", description: "Student created successfully" });
          onSuccess();
        })
        .catch((err) => {
          toast({ variant: "destructive", title: "Error", description: err });
        });
    }

    if (mode === "edit" && student) {
      dispatch(
        updateStudent({
          id: student.userId._id,
          data: payload,
        })
      )
      .unwrap()
        .then(() => {
          toast({ title: "Success", description: "Student updated successfully" });
          onSuccess();
        })
        .catch((err) => {
          toast({ variant: "destructive", title: "Error", description: err });
        });
    }
    });
    // startTransition(() => {
    //   setTimeout(() => {
    //     toast({ title: "Success", description: `Student ${data.name} saved!` });
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
                  <FormLabel required>Student Name</FormLabel>
                  <FormControl><Input {...field} readOnly={isViewMode || mode === 'edit'} placeholder="e.g., Alex Ray" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="regNo" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Registration Number</FormLabel>
                  <FormControl><Input {...field} readOnly={isViewMode || mode === 'edit'} placeholder="e.g., STU123" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl><Input {...field} type="email" readOnly={isViewMode} placeholder="e.g., alex@example.com" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="branch" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Department / Branch</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isViewMode}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.value} value={branch.value}>
                          {branch.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="batch" render={({ field }) => (
                <FormItem>
                  <FormLabel required>Batch / Academic Year</FormLabel>
                  <FormControl><Input {...field} readOnly={isViewMode} placeholder="e.g., 2025" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

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
              Save Changes
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog >
  );
}
