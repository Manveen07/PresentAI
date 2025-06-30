import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

interface AlertDialogBoxProps {
  children?: React.ReactNode;
  className?: string;
  description: string;
  loading?: boolean;
  onClick: () => void;
  open: boolean;
  handelOpen: (open: boolean) => void;
}

const AlertDialogBox = ({
  children,
  className,
  description,
  loading,
  onClick,
  open,
  handelOpen,
}: AlertDialogBoxProps) => {
  return (
    <AlertDialog open={open} onOpenChange={handelOpen}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            className={`${className}`}
            onClick={onClick}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
