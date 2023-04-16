import { For, createSignal } from "solid-js";
import TextInput from "../components/TextInput";
import Card from "../components/Card";
import Heading3 from "../components/Heading3";
import Fetcher from "../Fetcher";
import { CaptionTextSnippet } from "../ApiTypes";
import humanizeDuration from "humanize-duration";

type SearchTabProps = {};

{
  /* <Heading3 className="mt-6">All Videos:</Heading3>
              <div class="mt-3 flex flex-wrap">
                <For each={allVideos()}>
                  {(v) => (
                    <div class="mt-3 ml-3 w-[400px]">
                      <a target="_blank" href={v.url}>
                        <Card className="p-8 rounded-md hover:bg-gray-200 transition-colors duration-500">
                          <div class="flex">
                            <img src={v.thumbnail} alt="thumbnail" />
                            <div class="ml-3">
                              <div class="text-lg font-bold">{v.title}</div>
                              <div class="text-md">{v.channel_title}</div>
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
              </div> */
}

export default function SearchTab(props: SearchTabProps) {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [captionData, setCaptionData] = createSignal<Array<CaptionTextSnippet>>(
    []
  );

  async function onSearch(text: string) {
    const captionResults: Array<CaptionTextSnippet> = await Fetcher.get(
      "/video/caption/search",
      {
        text,
      }
    );

    setCaptionData(captionResults);
  }

  return (
    <div>
      <TextInput
        className="w-[300px]"
        placeholder="Ceviche"
        onInput={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
        value={searchTerm()}
      />
      <div class="mt-3 flex flex-wrap">
        <For each={captionData()}>
          {(c) => (
            <div class="mt-3 ml-3 w-[400px]">
              <a target="_blank" href={c.url}>
                <Card className="p-8 rounded-md hover:bg-gray-200 transition-colors duration-500">
                  <div class="flex">
                    <img src={c.thumbnail} alt="thumbnail" />
                    <div class="ml-3">
                      <div class="text-lg font-bold">{c.title}</div>
                      <div class="text-md">{c.channel_title}</div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <span class="text-gray-600 italic">
                      &quot;{"..." + c.caption_text + "..."}&quot;
                    </span>
                  </div>
                  <div class="mt-3">
                    <span class="text-blue-400">
                      At ~{humanizeDuration(Math.floor(c.start) * 1000)}
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
}
