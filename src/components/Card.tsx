import { JSX } from "solid-js/jsx-runtime";

type CardProps = {
  children: JSX.Element;
  paddingCss?: string;
  className?: string;
};

export default function Card(props: CardProps) {
  const paddingCss = props?.paddingCss ?? "p-6";
  const className = props?.className ?? "";

  return (
    <div
      class={`block rounded-xl bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 ${paddingCss} ${className}`}
    >
      {props.children}
    </div>
  );
}
