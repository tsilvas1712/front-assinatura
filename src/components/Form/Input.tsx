import {
  Input as ChackraInput,
  InputProps as ChackraInputProps,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ForwardRefRenderFunction, forwardRef } from "react";

interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest },
  ref
) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChackraInput
        id={name}
        name={name}
        focusBorderColor="blue.500"
        variant="filled"
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
