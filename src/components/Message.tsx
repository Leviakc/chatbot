interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

export const MessageBubble = (props: MessageProps) => {
  const isUser = props.role === "user";
  return (
    <>
      <li
        class={`${isUser ? "self-end bg-[#DCF8C6]" : "self-start bg-[#F1f0f0]"} my-2 max-w-[70%] rounded-lg px-4 py-2 font-sans text-[#222] shadow-md`}
      >
        {props.content}
      </li>
    </>
  );
};
