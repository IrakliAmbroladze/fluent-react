import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default App;
