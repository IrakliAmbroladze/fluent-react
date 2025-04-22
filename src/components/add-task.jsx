import React, { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState("");
  const handleClick = () => {
    onAddTask(text);
    setText("");
  };
  return (
    <>
      <input
        value={text}
        placeholder="Add task"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
    </>
  );
};

export default AddTask;
