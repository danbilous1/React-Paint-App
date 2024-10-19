import "./styles.css";
import { useState } from "react";
import Form from "./components/Form";
import Square from "./components/Square";

const apiUrl = "https://m8d6t6-3000.csb.app";

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
  function handleCreate() {
    console.log(squareList);
    fetch(apiUrl + "/api/picture", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(squareList),
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((result) => {
        console.log(result.id);
        fetch(apiUrl + "/api/picture/" + result.id)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
          });
      });
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
            key={index}
            el={el}
            index={index}
            selectedSquareIndex={selectedSquareIndex}
            setSelectedSquareIndex={setSelectedSquareIndex}
            handleUpdate={handleUpdate}
            mode={mode}
            squareList={squareList}
            setSquareList={setSquareList}
          />
        ))}
      </div>

      <button onClick={handleCreate}>share</button>
    </div>
  );
}
