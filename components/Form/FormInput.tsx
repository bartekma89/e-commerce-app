import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormData } from "../CheckoutForm";

interface ComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<CheckoutFormData>;
  name: keyof CheckoutFormData;
  label: string;
  error?: string;
  labelStyles?: string;
  inputStyles?: string;
}

export default function FormInput({
  name,
  register,
  label,
  error,
  labelStyles = "block mb-1 text-sm text-gray-600",
  inputStyles = "rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5",
  ...rest
}: ComponentProps) {
  return (
    <>
      <label htmlFor={name} className={labelStyles}>
        {label}
      </label>
      <input {...register(name)} id={name} className={inputStyles} {...rest} />
      {error && (
        <span role="alert" className="text-red-500 font-bold text-sm">
          {error}
        </span>
      )}
    </>
  );
}
