import { createEffect, For } from "solid-js";
import { MessageBubble } from "./Message";
import type { Message } from "../data";

interface ChatMessages {
  messages: Message[];
}

export const ChatMessages = (props: ChatMessages) => {
  const messages = () => props.messages || [];
  let chatContainer: HTMLUListElement = null!;

  createEffect(() => {
    messages(); // Access messages to trigger reactivity
    // Scroll to the bottom when messages change smoothly
    // chatContainer.scrollTo({
    //   top: chatContainer.scrollHeight,
    //   behavior: "smooth",
    // });
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom on mount
  });

  return (
    <>
      <ul
        class="hide-scrollbar flex flex-col gap-2 overflow-y-auto scroll-smooth px-5 py-3"
        ref={chatContainer}
      >
        <For each={messages()}>
          {(item) => <MessageBubble role={item.role} content={item.content} />}
        </For>
      </ul>
    </>
  );
};
