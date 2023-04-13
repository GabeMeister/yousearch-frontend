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
  const [allVideos, { refetch }] = createResource(getVideos);
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
      <p class="text-5xl">Welcome to USearch!</p>
      {/* <p class="">{JSON.stringify(allVideos.loading)}</p> */}
      <Heading3 className="mt-6">Add a YouTube video:</Heading3>
      <TextInput
        className="w-[400px]"
        placeholder="https://www.youtube.com/watch?v=2C_F92QmT88"
        onInput={(e) => setUrl(e.target.value)}
        value={url()}
        disabled={loading() || allVideos.loading}
      />
      <Button
        onClick={addVideo}
        className="ml-3"
        disabled={loading() || allVideos.loading}
      >
        Add
      </Button>
      <Heading3 className="mt-6">All Videos:</Heading3>
      <ul class="mt-3">
        <For each={allVideos()}>
          {(v) => (
            <li class="mt-3">
              <div class="text-lg font-bold">{v.title}</div>
              <span class="text-gray-600 italic">
                &quot;{v.captions + "..."}&quot;
              </span>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default App;
