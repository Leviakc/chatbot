import type { Setter } from "solid-js";
import type { Message } from "../data";

interface InputProps {
  setMessage: Setter<Message[]>;
  disabled: boolean;
  handleMessage: (message: string) => void;
}
export const Input = (props: InputProps) => {
  const disabled = () => props.disabled || false;
  const handleMessage = (message: string) => props.handleMessage(message);
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (input.value.trim() === "") {
      return;
    }
    const newMessage: Message = {
      role: "user",
      content: input.value.trim(),
    };
    props.setMessage((prevMessages) => [...prevMessages, newMessage]);
    input.value = "";
    console.log("newMessage", newMessage.content);
    handleMessage(newMessage.content);
    // Simulate a bot response
    // setTimeout(() => {
    //   const botResponse: Message = {
    //     role: "bot",
    //     message: `You said: ${newMessage.message}`,
    //   };
    //   props.setMessage((prevMessages) => [...prevMessages, botResponse]);
    // }, 2000); // Simulate a delay for the bot response
  };

  let input: HTMLInputElement = null!;

  return (
    <form
      onSubmit={handleSubmit}
      class="bg-secondary-300 m-5 flex gap-4 rounded-full px-6 py-3"
      onClick={() => {
        input.focus();
      }}
    >
      <label for="message" class=""></label>
      <input
        class="grow disabled:opacity-50"
        placeholder="Escribe tu mensage aquí"
        id="message"
        ref={input}
        disabled={disabled()}
      />
      <button
        type="submit"
        class="disabled:text-gray-700"
        disabled={disabled()}
      >
        Enviar
      </button>
    </form>
  );
};
