import { Component, For, createResource, createSignal } from "solid-js";
import Fetcher from "./Fetcher";
import { Video } from "./ApiTypes";
import Button from "./components/Button";
import TextInput from "./components/TextInput";
import Heading3 from "./components/Heading3";
import Card from "./components/Card";

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
    <div class="p-6 bg-gray-50 min-h-screen">
      <p class="text-5xl">
        <span class="font-bold">QuoteUup</span>
      </p>
      {/* <p>{JSON.stringify(allVideos.loading)}</p> */}
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
        loading={loading() || allVideos.loading}
      >
        Add
      </Button>
      <Heading3 className="mt-6">All Videos:</Heading3>
      <div class="mt-3 flex flex-wrap">
        <For each={allVideos()}>
          {(v) => (
            <div class="mt-3 ml-3 w-[400px]">
              <a target="_blank" href={v.url}>
                <Card className="p-8 rounded-md hover:bg-gray-100 transition-colors duration-500">
                  <div class="flex">
                    <img src={v.thumbnail} alt="thumbnail" />
                    <div class="ml-3">
                      <div class="text-lg font-bold">{v.title}</div>
                      <div class="text-md">{v.channel_id}</div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <span class="text-gray-600 italic">
                      &quot;{v.captions + "..."}&quot;
                    </span>
                  </div>
                </Card>
              </a>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;
