import { useState } from "react";

export default function Square({
  el,
  index,
  selectedSquareIndex,
  setSelectedSquareIndex,
  handleUpdate,
  mode,
}) {
  //   let {el, index} = props
  const [mousePos, setMousePos] = useState([0, 0]);
  return (
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
        boxSizing: "border-box",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedSquareIndex(index);
      }}
      draggable
      // onDrag={(e) => {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   if (e.clientX && e.clientY) {
      //     handleUpdate(index, "left", e.clientX);
      //     handleUpdate(index, "top", e.clientY);
      //   }
      // }}
      onDragEnd={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.clientX && e.clientY) {
          handleUpdate(
            index,
            "left",
            el.left + e.nativeEvent.layerX - mousePos[0]
          );
          handleUpdate(
            index,
            "top",
            el.top + e.nativeEvent.layerY - mousePos[1]
          );
          console.log(e);
          setMousePos([0, 0]);
        }
      }}
      onDragStart={(e) => {
        setMousePos([e.nativeEvent.layerX, e.nativeEvent.layerY]);
        setSelectedSquareIndex(index);
      }}
    >
      {index === selectedSquareIndex && mode && (
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
  );
}
