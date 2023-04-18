import { HopeProvider } from "@hope-ui/solid";
import { Component } from "solid-js";
import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";
import SearchTab from "./sections/SearchTab";
import AddVideoTab from "./sections/AddVideoTab";

const App: Component = () => {
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
              <AddVideoTab />
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
