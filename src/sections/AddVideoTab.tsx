import Button from "../components/Button";
import { createSignal } from "solid-js";
import TextInput from "../components/TextInput";
import Form from "../components/Form";
import Fetcher from "../Fetcher";

type AddVideoTabProps = {};

export default function AddVideoTab(props: AddVideoTabProps) {
  const [loading, setLoading] = createSignal(false);
  const [url, setUrl] = createSignal("");

  async function addVideo() {
    setLoading(true);

    await Fetcher.post(
      "/video",
      {},
      {
        url: url(),
      }
    );

    setLoading(false);

    setUrl("");
  }

  return (
    <div class="AddVideoTab">
      <span>Paste the URL:</span>
      <Form onSubmit={addVideo}>
        <div class="flex flex-col md:flex-row">
          <TextInput
            className="w-full md:w-[400px]"
            placeholder="https://www.youtube.com/watch?v=2C_F92QmT88"
            onInput={(e) => setUrl(e.target.value)}
            value={url()}
            disabled={loading()}
          />
          <Button
            type="submit"
            className="ml-0 md:ml-3 mt-2 md:mt-0 w-20"
            loading={loading()}
          >
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
}
