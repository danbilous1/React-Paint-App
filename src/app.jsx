import "./styles.css";
import { useState } from "react";

export default function App() {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("#ff0000");
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(40);
  const [squareList, setSquareList] = useState([]);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(null);

  console.log(squareList);
  function handleUpdate(index, key, value) {
    let selectedSquare = squareList[index];
    if (selectedSquare) {
      selectedSquare[key] = value;
      squareList[index] = { ...selectedSquare };
      setSquareList([...squareList]);
    }
  }

  return (
    <div>
      {show ? (
        <>
          <input
            type="number"
            placeholder="Enter width"
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
              handleUpdate(selectedSquareIndex, "width", e.target.value);
            }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              handleUpdate(selectedSquareIndex, "color", e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Enter height"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              handleUpdate(selectedSquareIndex, "height", e.target.value);
            }}
          />
          <button
            onClick={() => {
              setSquareList(
                squareList.concat({
                  color,
                  width,
                  height,
                  top: 50 + squareList.length * 25,
                  left: 50 + squareList.length * 25,
                })
              );
              setSelectedSquareIndex(squareList.length);
            }}
          >
            add new one
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            setShow(true);
            setSquareList(
              squareList.concat({
                color,
                width,
                height,
                top: 50,
                left: 50,
              })
            );
          }}
        >
          Start
        </button>
      )}

      {squareList.map((el, index) => (
        <div
          style={{
            backgroundColor: el.color,
            width: el.width + "px",
            height: el.height + "px",
            position: "absolute",
            top: el.top + "px",
            left: el.left + "px",
            border: index === selectedSquareIndex ? "2px solid black" : "unset",
            zIndex: index === selectedSquareIndex ? 2 : 1,
          }}
          onClick={() => {
            setSelectedSquareIndex(index);
          }}
        >
          {index === selectedSquareIndex && (
            <>
              <span
                style={{
                  right: "-30px",
                  position: "absolute",
                  top: el.height / 2 - 13 + "px",
                }}
                onClick={() => {
                  handleUpdate(index, "left", el.left + 1);
                }}
              >
                ⏩
              </span>
              <span
                style={{
                  top: "-30px",
                  position: "absolute",
                  left: el.width / 2 - 10 + "px",
                }}
                onClick={() => {
                  handleUpdate(index, "top", el.top - 1);
                }}
              >
                ⏫
              </span>
              <span
                style={{
                  left: "-30px",
                  position: "absolute",
                  top: el.height / 2 - 13 + "px",
                }}
                onClick={() => {
                  handleUpdate(index, "left", el.left - 1);
                }}
              >
                ⏪
              </span>
              <span
                style={{
                  bottom: "-30px",
                  position: "absolute",
                  left: el.width / 2 - 10 + "px",
                }}
                onClick={() => {
                  handleUpdate(index, "top", el.top + 1);
                }}
              >
                ⏬
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
