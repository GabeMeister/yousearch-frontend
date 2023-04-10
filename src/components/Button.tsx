import { JSX } from "solid-js/jsx-runtime";

const ENABLED_CLASSES = `cursor-pointer inline-block rounded bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]`;

const DISABLED_CLASSES = `cursor-not-allowed inline-block rounded bg-primary-accent-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200 disabled:opacity-70`;

type ButtonProps = {
  children: JSX.Element;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      class={`${props.disabled ? DISABLED_CLASSES : ENABLED_CLASSES} ${
        props.className
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
