import { JSX } from "solid-js/jsx-runtime";

type Heading4Props = {
  children: JSX.Element;
  className?: string;
};

export default function Heading4({ children, className = "" }: Heading4Props) {
  return <h3 class={`text-2xl ${className}`}>{children}</h3>;
}
