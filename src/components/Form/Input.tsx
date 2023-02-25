import {
  FormControl,
  Input as ChackraInput,
  FormLabel,
  InputProps as ChackraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
}
export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChackraInput
        id={name}
        name={name}
        focusBorderColor="blue.500"
        variant="filled"
        {...rest}
      />
    </FormControl>
  );
}
