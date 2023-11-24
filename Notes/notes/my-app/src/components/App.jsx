import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [items, setItems] = useState([]);

  function createNote(input) {
    setItems((prevValue) => {
      return [...prevValue, input];
    });
  }
  function deleteNote(id) {
    setItems((prevValue) => {
      return prevValue.filter((data, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={createNote} />
      {items.map((value, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={value.title}
            content={value.content}
            deleteItem={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
