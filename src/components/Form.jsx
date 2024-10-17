import { useState } from "react";

export default function Form({
  handleUpdate,
  selectedSquareIndex,
  squareList,
  setSquareList,
  setSelectedSquareIndex,
  mode,
  setMode,
}) {
  const [color, setColor] = useState("#ff0000");
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(40);
  return (
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
      <label>movement mode</label>
      <input
        type="checkbox"
        value={mode}
        onChange={(e) => setMode(e.target.checked)}
      />
    </>
  );
}
