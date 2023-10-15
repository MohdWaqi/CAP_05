import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleCheck,
  faPen,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Todo = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const date = new Date();

  console.log(task);
  return (
    <>
      <nav>
        {date.toLocaleDateString("default", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </nav>
      <div>
        <input
          type="text"
          placeholder="Want to Add new Task ?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></input>
        <button
          onClick={() => {
            if (text != "") {
              setTask([
                ...task,
                { id: Math.random(), title: text, status: false },
              ]);
              setText("");
            }
          }}
        >
          Add
        </button>
      </div>
      {task.map((element) => (
        <TodoItem
          key={element.id}
          name={element.title}
          id={element.id}
          isCompleted={element.status}
          alterList={setTask}
          list={task}
        />
      ))}
    </>
  );
};

const TodoItem = (props) => {
  const [isClicked, setClicked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.name);

  return (
    <div
      className="item"
      style={{
        transform: isClicked && "scale(1.1)",
        borderLeft: isClicked && "5px solid #3eb3de",
        boxShadow: isClicked && "#3eb3de 0px 5px 15px",
        zIndex: isClicked && 3,
      }}
    >
      {edit ? (
        <input
          type="text"
          onChange={(e) => {
            setEditValue(e.target.value);
          }}
          value={editValue}
        ></input>
      ) : (
        <label
          style={{
            textDecoration: props.isCompleted && "line-through",
            color: props.isCompleted && "gray",
          }}
        >
          {props.name}
        </label>
      )}
      <div className="options">
        {props.isCompleted ? (
          <Option
            type={faClock}
            change={() => {
              setClicked(!isClicked);
            }}
            show={isClicked ? "flex" : "none"}
            editTask={[props.list, props.alterList, editValue, props.id]}
            action={() => {
              setEdit(false);
            }}
          />
        ) : (
          <Option
            type={faCircleCheck}
            change={() => {
              setClicked(!isClicked);
            }}
            show={isClicked ? "flex" : "none"}
            action={() => {
              setEdit(false);
            }}
            editTask={[props.list, props.alterList, editValue, props.id]}
          />
        )}
        <Option
          type={faTrash}
          change={() => {
            setClicked(!isClicked);
          }}
          show={isClicked ? "flex" : "none"}
          removeTask={[props.list, props.alterList, props.id]}
        />
        <Option
          type={faPen}
          change={() => {
            setClicked(!isClicked);
          }}
          show={isClicked ? "flex" : "none"}
          action={() => {
            setEdit(true);
          }}
          editTask={[props.list, props.alterList, editValue, props.id]}
        />
        {props.isCompleted ? (
          <Option
            type={faCircleCheck}
            change={() => {
              setClicked(!isClicked);
            }}
            editTask={[props.list, props.alterList, editValue, props.id]}
          />
        ) : (
          <Option
            type={faClock}
            change={() => {
              setClicked(!isClicked);
            }}
            editTask={[props.list, props.alterList, editValue, props.id]}
          />
        )}
      </div>
    </div>
  );
};

const Option = (props) => {
  const catched = useRef();
  const updateTaskList = (tasks, func, value, id) => {
    tasks.filter((item, index) => {
      if (item.id == id && value != "") {
        tasks[index].title = value;
      }
    });
    func([...tasks]);
  };
  const handleComplete = (tasks, func, id, status) => {
    tasks.filter((item) => {
      if (item.id == id) {
        item.status = status;
      }
    });
    func(tasks);
  };

  const handleClick = () => {
    props.change();
    const currentButton = catched.current.className.baseVal;

    if (currentButton == "svg-inline--fa fa-circle-check " && props.action) {
      handleComplete(
        props.editTask[0],
        props.editTask[1],
        props.editTask[3],
        true
      );
      props.action();
      console.log(props.editTask[0]);
      updateTaskList(
        props.editTask[0],
        props.editTask[1],
        props.editTask[2],
        props.editTask[3]
      );
    } else if (currentButton == "svg-inline--fa fa-clock " && props.action) {
      handleComplete(
        props.editTask[0],
        props.editTask[1],
        props.editTask[3],
        false
      );
      props.action();
      updateTaskList(
        props.editTask[0],
        props.editTask[1],
        props.editTask[2],
        props.editTask[3]
      );
    } else if (currentButton == "svg-inline--fa fa-pen ") {
      props.action();
      updateTaskList(
        props.editTask[0],
        props.editTask[1],
        props.editTask[2],
        props.editTask[3]
      );
    } else if (currentButton == "svg-inline--fa fa-trash ") {
      props.removeTask[1](
        props.removeTask[0].filter((item) => item.id != props.removeTask[2])
      );
    }
  };
  return (
    <button style={{ display: props.show }} onClick={handleClick}>
      <FontAwesomeIcon
        ref={catched}
        icon={props.type}
        style={{ color: "#3eb3de" }}
      />
    </button>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Todo />);
