import { createSignal } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <h1 class="text-teal-500">Hello</h1>
      {count()}
    </>
  );
}

export default App;
