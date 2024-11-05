import "../styles.css";
import { useState, useEffect } from "react";
import Form from "../components/Form";
import Square from "../components/Square";
import { useParams, useNavigate } from "react-router-dom";

const apiUrl = "https://m8d6t6-3000.csb.app";

export default function Preview() {
  const { id } = useParams();
  const [squareList, setSquareList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(apiUrl + "/api/picture/" + id)
        .then((res) => res.json())
        .then((result) => {
          setSquareList(result);
          setLoading(false);
        });
    }
  }, [id]); //componentDidMount

  return (
    <div className="container mt-2">
      <button
        className="btn btn-primary"
        onClick={() => navigate("/", { state: { squareList: squareList } })}
      >
        Create Copy
      </button>
      {loading ? (
        <div>Loading Picture...</div>
      ) : (
        <div className="container">
          {squareList.map((el, index) => (
            <Square key={index} el={el} readOnly />
          ))}
        </div>
      )}
    </div>
  );
}
