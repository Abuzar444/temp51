"use client";
import { useFormState } from "react-dom";
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";
import { type actionFunction } from "@/utils/types";

const initialState = {
  message: "",
  isError: false,
};

const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        description: state.message,
        variant: state.isError ? "destructive" : "default",
      });
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
};
export default FormContainer;
