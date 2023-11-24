import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [input, setInput] = useState({ title: "", content: "" });
  const [state, setState] = useState(false);

  function changeState() {
    setState(true);
  }

  function currentInput(event) {
    const { name, value } = event.target;
    setInput((newValue) => {
      return {
        ...newValue,
        [name]: value,
      };
    });
  }
  function handleEvent(event) {
    {
      props.addNote(input);
    }
    event.preventDefault();
  }
  return (
    <div>
      <form className="create-note">
        {state && (
          <input
            onChange={currentInput}
            name="title"
            placeholder="Title"
            value={input.title}
          />
        )}
        <textarea
          onChange={currentInput}
          onClick={changeState}
          name="content"
          placeholder="Take a note..."
          rows={state ? 4 : 1}
          value={input.content}
        />
        <Zoom in={state}>
          <Fab onClick={handleEvent}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
