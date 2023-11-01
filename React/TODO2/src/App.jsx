import { useState, useEffect } from "react";
import axios from "axios";
import { TodoItems } from "./TodoItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";

const todoData = async (endpoint) => {
  try {
    let res = await axios.get(endpoint);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
function App() {
  const [newTask, setNewTask] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getData(page);
  }, [page]);

  const getData = async (page) => {
    setIsLoading(true);
    try {
      let task = await todoData(
        `http://localhost:3000/tasks?_limit=6&_page=${page}`
      );
      setTotalPages(Math.ceil(Number(task.headers["x-total-count"] / 6)));
      setItems(task.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const AddTask = async () => {
    const data = {
      title: newTask,
      completed: false,
    };
    await axios
      .post("http://localhost:3000/tasks", data)
      .then((res) => {
        console.log(res);
        setNewTask("");
        getData(page);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <img src="https://media.wired.com/photos/62f43bda23d2b53441872eda/3:2/w_2400,h_1600,c_limit/tunnel_robots_science_GettyImages-1030459242.jpg"></img>
      <div className="todoDisplay">
        <h1>TODO LIST</h1>
        <div>
          <div>
            <button
              className="add"
              onClick={() => {
                newTask !== "" && AddTask();
              }}
            >
              +
            </button>
            <input
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              placeholder="Create a new Task..."
            />
          </div>
        </div>
        <div className="tasks">
          {isLoading ? (
            <ReactLoading
              type="bubbles"
              style={{ width: "30%", marginLeft: "25%" }}
            />
          ) : (
            <>
              {items.map((task) => (
                <TodoItems
                  key={task.id}
                  title={task.title}
                  status={task.completed}
                  id={task.id}
                  list={[getData, page]}
                />
              ))}
            </>
          )}
        </div>

        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            style={{ backgroundColor: page === 1 && "gray" }}
            onClick={() => setPage(1)}
          >
            1
          </button>
          <button
            style={{ backgroundColor: page === 2 && "gray" }}
            onClick={() => setPage(2)}
          >
            2
          </button>
          <button
            style={{ backgroundColor: page === 3 && "gray" }}
            onClick={() => setPage(3)}
          >
            3
          </button>
          ...
          <button
            style={{ backgroundColor: page === totalPages && "gray" }}
            onClick={() => setPage(totalPages)}
          >
            Last
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
