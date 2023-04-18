import { HopeProvider } from "@hope-ui/solid";
import { Component, createResource, createSignal } from "solid-js";
import Fetcher from "./Fetcher";
import { Video } from "./ApiTypes";
import Button from "./components/Button";
import TextInput from "./components/TextInput";
import Heading4 from "./components/Heading4";
import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";
import SearchTab from "./sections/SearchTab";
import Form from "./components/Form";

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
    <HopeProvider>
      <div class="p-6 bg-gray-50 min-h-screen">
        <div class="flex items-center">
          <img src="/paper.svg" />
          <h1 class="text-4xl md:text-5xl font-bold inline-block ml-2">
            Quote Uup
          </h1>
        </div>
        <div class="mt-3">
          <Tabs>
            <TabList>
              <Tab>Add a Video</Tab>
              <Tab>Search Videos</Tab>
            </TabList>
            <TabPanel>
              <span>Paste the URL:</span>
              <Form onSubmit={addVideo}>
                <div class="flex flex-col md:flex-row">
                  <TextInput
                    className="w-full md:w-[400px]"
                    placeholder="https://www.youtube.com/watch?v=2C_F92QmT88"
                    onInput={(e) => setUrl(e.target.value)}
                    value={url()}
                    disabled={loading() || allVideos.loading}
                  />
                  <Button
                    className="ml-0 md:ml-3 mt-2 md:mt-0 w-20"
                    loading={loading() || allVideos.loading}
                  >
                    Add
                  </Button>
                </div>
              </Form>
            </TabPanel>
            <TabPanel>
              <SearchTab />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </HopeProvider>
  );
};

export default App;
