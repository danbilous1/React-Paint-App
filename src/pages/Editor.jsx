import "../styles.css";
import { useState, useEffect } from "react";
import Form from "../components/Form";
import Square from "../components/Square";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const apiUrl = "https://m8d6t6-3000.csb.app";

export default function Editor() {
  const [show, setShow] = useState(false);
  let location = useLocation();
  const [squareList, setSquareList] = useState([]);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(null);
  const [mode, setMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.state?.squareList) {
      setSquareList(location?.state?.squareList);
      setShow(true);
    }
  }, [location]);

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
    setLoading(true);
    fetch(apiUrl + "/api/picture", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(squareList),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => {
        console.log(result.id);
        navigate("/picture/" + result.id);
      });
  }
  if (loading) {
    return <div>Creating picture...</div>;
  }
  return (
    <div className="container">
      {show ? (
        <>
          <Form
            handleUpdate={handleUpdate}
            selectedSquareIndex={selectedSquareIndex}
            setSelectedSquareIndex={setSelectedSquareIndex}
            squareList={squareList}
            mode={mode}
            setMode={setMode}
            setSquareList={setSquareList}
          />
          <button onClick={handleCreate} className="btn btn-primary">
            share
          </button>
        </>
      ) : (
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            setShow(true);
            setSquareList(
              squareList.concat({
                color: "red",
                width: 40,
                height: 40,
                top: 200,
                left: 200,
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
    </div>
  );
}
