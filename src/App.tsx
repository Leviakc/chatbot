import { ChatMessages } from "./components/ChatMessages";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { createSignal, onMount } from "solid-js";
import { data } from "./data";
//@ts-ignore
import { CreateMLCEngine } from "@mlc-ai/web-llm";

function App() {
  const [messages, setMessage] = createSignal<typeof data>([]);
  const [smallInput, setSmallInput] = createSignal("");
  const [loading, setLoading] = createSignal(true);

  //@ts-ignore
  let engine;
  let $small;
  onMount(async () => {
    // @ts-ignore
    const initProgressCallback = (initProgress) => {
      setSmallInput(initProgress.text);
      if (initProgress.progress === 1) {
        setLoading(false);
      }
    };
    // const selectedModel = "SmolLM2-360M-Instruct-q4f32_1-MLC";
    // const selectedModel = "TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC-1k";
    // const selectedModel = "Qwen2.5-Coder-0.5B-Instruct-q4f32_1-MLC";
    // const selectedModel = "gemma-2b-it-q4f32_1-MLC";
    // const selectedModel = "gemma-2b-it-q4f32_1-MLC-1k";
    const selectedModel = "Qwen2.5-1.5B-Instruct-q4f32_1-MLC";
    // Qwen2.5-1.5B-Instruct-q4f32_1-MLC - 1888.97 
    // Qwen2.5-0.5B-Instruct-q4f32_1-MLC - 1060.2

    engine = await CreateMLCEngine(
      selectedModel,
      { initProgressCallback: initProgressCallback }, // engineConfig
    );
  });
  const handleMessage = async (message: string) => {
    console.log("handleMessage", message);
    //@ts-ignore
    if (engine === undefined) {
      console.error("Engine is not initialized yet.");
      return;
    }
    if (message.trim() === "" && message === undefined) {
      console.warn("Empty message, not sending.");
      return;
    }

    let reply = "";
    //@ts-ignore
    console.log("engine", engine);
    //@ts-ignore
    const response = await engine.chat.completions.create({
      messages: [
        ...messages(),
      ],
      stream: true,
    });
    setMessage((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: "",
      },
    ]);
    for await (const chunk of response) {
      const content = chunk.choices[0].delta.content;
      if (content) {
        reply += content;
        setMessage((message) => message.map((msg, index) => {
          if (index === message.length - 1) {
            return {
              ...msg,
              content: msg.content + content,
            }
          }
          return msg
        }));
        // console.log("reply", reply);
      }
    }
  };

  return (
    <>
      <main class="bg-secondary grid h-dvh w-full grid-cols-[minmax(30rem,_70rem)] grid-rows-[auto_1fr_auto] justify-center px-10 text-white">
        <Header />
        <ChatMessages messages={messages()} />
        <Input
          setMessage={setMessage}
          disabled={loading()}
          handleMessage={handleMessage}
        />
        <small
          class="right-0 bottom-2.5 left-0 m-auto w-80 text-xs text-[#555]"
          ref={$small}
        >
          &nbsp; {smallInput()}
        </small>
      </main>
    </>
  );
}

export default App;
