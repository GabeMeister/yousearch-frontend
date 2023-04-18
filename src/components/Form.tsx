import { JSX } from "solid-js/jsx-runtime";

type FormProps = {
  onSubmit: () => void;
  children: JSX.Element;
};

export default function Form(props: FormProps) {
  function onSubmit(evt: any) {
    evt.preventDefault();

    props.onSubmit();
  }

  return (
    <form class="Form" onSubmit={onSubmit}>
      {props.children}
    </form>
  );
}
