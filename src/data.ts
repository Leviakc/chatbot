export type Message = {
  role: "user" | "assistant";
  content: string;
};

export const data: Message[] = [
  {
    role: "user",
    content: "Hello, what can you do?",
  },
  {
    role: "assistant",
    content:
      "Hi! I can help you with programming questions, provide code examples, and assist with debugging.",
  },
  {
    role: "user",
    content: "How do I reverse a string in Python?",
  },
  {
    role: "assistant",
    content:
      "You can reverse a string in Python using slicing: reversed_string = your_string[::-1]",
  },
  {
    role: "user",
    content: "Thank you!",
  },
  {
    role: "assistant",
    content: "You're welcome! Let me know if you have more questions.",
  },
];
