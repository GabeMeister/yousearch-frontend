import { For, createSignal } from "solid-js";
import TextInput from "../components/TextInput";
import Card from "../components/Card";
import Fetcher from "../Fetcher";
import {
  CaptionSearchResults,
  CaptionTextSnippet,
  VideoCaptionsResult,
} from "../ApiTypes";
import humanizeDuration from "humanize-duration";

type SearchTabProps = {};

export default function SearchTab(props: SearchTabProps) {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [videoCaptionResults, setVideoCaptionResults] = createSignal<
    Array<VideoCaptionsResult>
  >([]);

  async function onSearch(text: string) {
    const captionResults: CaptionSearchResults = await Fetcher.get(
      "/video/caption/search",
      {
        text,
      }
    );

    setVideoCaptionResults(captionResults.videos);
  }

  return (
    <div>
      <div class="flex items-start md:items-center flex-col md:flex-row">
        <span>Search anything:</span>
        <TextInput
          className="w-full md:w-[300px] ml-0 md:ml-3"
          placeholder="Ceviche"
          onInput={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          value={searchTerm()}
        />
      </div>
      <div class="mt-3">
        <For each={videoCaptionResults()}>
          {(item) => {
            return (
              <div class="mt-12">
                <a target="_blank" href={item.video.url}>
                  <div class="flex items-start w-full max-w-[500px]">
                    <img src={item.video.thumbnail} alt="thumbnail" />
                    <div class="ml-3">
                      <div class="text-lg font-bold">{item.video.title}</div>
                      <div class="text-md">{item.video.channel_title}</div>
                    </div>
                  </div>
                </a>
                <div>
                  <For each={item.captions}>
                    {(caption) => {
                      console.log(caption);
                      let o = {
                        url: "https://www.youtube.com/watch?v=xkF-DqE75W4&t=106s",
                        caption_text: "not have bad taste in entertainment",
                        start: 107.5199966430664,
                      };

                      return (
                        <div class="mt-2 px-5 py-1 bg-gray-200 transition-color duration-500 hover:bg-gray-300 rounded-full w-fit">
                          <a target="_blank" href={caption.url}>
                            <div>
                              <span class="text-blue-400">
                                ~
                                {humanizeDuration(
                                  Math.floor(caption.start) * 1000
                                )}
                              </span>
                              <span>{" - "}</span>
                              <span class="text-gray-600 italic">
                                &quot;{"..." + caption.caption_text + "..."}
                                &quot;
                              </span>
                            </div>
                          </a>
                        </div>
                      );
                    }}
                  </For>
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
