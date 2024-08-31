"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SignInButton } from "@clerk/nextjs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";
type ButtonType = {
  className?: string;
  text?: string;
  size?: BtnSize;
};

type BtnSize = "default" | "lg" | "sm";

export const SubmitButton = ({
  className = "",
  text = "submit",
  size = "lg",
}: ButtonType) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={`capitalize ${className}`}
      type='submit'
      disabled={pending}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className='m-2 h-4 animate-spin' />
          Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='pt-2 cursor-pointer'
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button size='icon' variant='outline' type='submit'>
      {pending ? (
        <ReloadIcon className='animate-spin' />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

type ActionType = "edit" | "delete";
export const IconButton = ({ actionType }: { actionType: ActionType }) => {
  const { pending } = useFormStatus();
  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPenSquare />;
      case "delete":
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type ${never}`);
    }
  };
  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'
    >
      {pending ? <ReloadIcon className='animate-spin' /> : renderIcon()}
    </Button>
  );
};
