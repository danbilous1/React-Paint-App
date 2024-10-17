import "./styles.css";
import { useState } from "react";
import Form from "./components/Form";
import Square from "./components/Square";

export default function App() {
  const [show, setShow] = useState(false);
  const [squareList, setSquareList] = useState([]);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(null);
  const [mode, setMode] = useState(false);

  function handleUpdate(index, key, value) {
    let selectedSquare = squareList[index];
    if (selectedSquare) {
      selectedSquare[key] = value;
      squareList[index] = { ...selectedSquare };
      setSquareList([...squareList]);
    }
  }

  return (
    <div className="container">
      {show ? (
        <Form
          handleUpdate={handleUpdate}
          selectedSquareIndex={selectedSquareIndex}
          setSelectedSquareIndex={setSelectedSquareIndex}
          squareList={squareList}
          mode={mode}
          setMode={setMode}
          setSquareList={setSquareList}
        />
      ) : (
        <button
          onClick={() => {
            setShow(true);
            setSquareList(
              squareList.concat({
                color: "red",
                width: 40,
                height: 40,
                top: 50,
                left: 50,
              })
            );
          }}
        >
          Start
        </button>
      )}
      <div onClick={() => setSelectedSquareIndex(null)} className="container">
        {squareList.map((el, index) => (
          <Square
            el={el}
            index={index}
            selectedSquareIndex={selectedSquareIndex}
            setSelectedSquareIndex={setSelectedSquareIndex}
            handleUpdate={handleUpdate}
            mode={mode}
          />
        ))}
      </div>

      <button>share</button>
    </div>
  );
}
