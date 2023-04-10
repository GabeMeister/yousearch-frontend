import { Accessor } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

type TextInputProps = {
  value: Accessor<string>;
  id?: string | undefined;
  placeholder?: string | undefined;
  onInput?:
    | JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent>
    | undefined;
  className?: string;
};

export default function TextInput({
  value,
  id = "default-text-input",
  className = "",
  placeholder = "",
  onInput,
}: TextInputProps) {
  return (
    <input
      type="text"
      id={id}
      class={`border-b-2 px-2 py-1 border-blue-300 focus:border-blue-400 transition-colors duration-500 outline-0 border-md ${className}`}
      placeholder={placeholder}
      onInput={onInput}
      value={value()}
    />
  );
}
