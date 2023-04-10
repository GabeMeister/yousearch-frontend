import { JSX } from "solid-js/jsx-runtime";

type Heading3Props = {
  children: JSX.Element;
  className?: string;
};

export default function Heading3({ children, className = "" }: Heading3Props) {
  return <h3 class={`text-3xl ${className}`}>{children}</h3>;
}
