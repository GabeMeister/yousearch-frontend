import { Component, For, createResource, createSignal } from "solid-js";
import Fetcher from "./Fetcher";
import { Video } from "./ApiTypes";
import Button from "./components/Button";
import TextInput from "./components/TextInput";
import Heading3 from "./components/Heading3";

async function getVideos(): Promise<Array<Video>> {
  const data = await Fetcher.get("/video/all");
  const allUsers: Array<Video> = data;

  return allUsers;
}

const App: Component = () => {
  const [loading, setLoading] = createSignal(false);
  const [data, { refetch }] = createResource(getVideos);
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
    refetch();
  }

  return (
    <div class="p-6">
      <p class="text-5xl">Display all the videos!</p>
      {/* <p class="">{JSON.stringify(data.loading)}</p> */}
      <Heading3 className="mt-3">Add a url:</Heading3>
      <TextInput
        className="w-[400px]"
        placeholder="https://www.youtube.com/watch?v=2C_F92QmT88"
        onInput={(e) => setUrl(e.target.value)}
        value={url()}
        disabled={loading() || data.loading}
      />
      <Button
        onClick={addVideo}
        className="ml-3"
        disabled={loading() || data.loading}
      >
        Add
      </Button>
      <Heading3 className="mt-3">All Videos:</Heading3>
      <ul class="mt-3">
        <For each={data()}>
          {(v) => (
            <>
              <li>
                <span>{v.title}</span>
              </li>
            </>
          )}
        </For>
      </ul>
    </div>
  );
};

export default App;
