import { JSX } from "solid-js/jsx-runtime";

type TextInputProps = {
  value: string;
  id?: string | undefined;
  placeholder?: string | undefined;
  onInput?:
    | JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent>
    | undefined;
  className?: string;
  disabled?: boolean;
};

export default function TextInput(props: TextInputProps) {
  return (
    <input
      type="text"
      id={props.id}
      class={`border-b-2 px-2 py-1 bg-transparent border-blue-300 focus:border-blue-400 transition-colors duration-500 outline-0 border-md ${props.className}`}
      placeholder={props.placeholder}
      onInput={props.onInput}
      value={props.value}
      disabled={props.disabled ?? false}
    />
  );
}
