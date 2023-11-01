import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const TodoItems = ({ title, status, id, list }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [currentStatus, setCurrent] = useState(status);
  const edit = async (identity, isTitle = false, isStatus = false) => {
    try {
      console.log(isStatus, isTitle);
      let change = {};
      if (isStatus) {
        change = { completed: !status };
      }
      if (isTitle) {
        change = { title: editedTitle };
      }

      await axios
        .patch(`http://localhost:3000/tasks/${identity}`, change)
        .then((res) => {
          console.log("successful");
          list[0](list[1]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <input
            className="tick"
            type="checkbox"
            onChange={() => "readOnly"}
            checked={currentStatus && "checked"}
          />
          <span
            onClick={() => {
              setCurrent(!status);
              edit(id, false, true);
            }}
            className="checkmark"
          ></span>
          {isEdit ? (
            <input
              value={editedTitle}
              onChange={(e) => {
                setEditedTitle(e.target.value);
              }}
            />
          ) : (
            <h3
              style={{ color: currentStatus ? "gray" : "white" }}
              onClick={() => {
                setIsEdit(true);
              }}
            >
              {title}
            </h3>
          )}
          {isEdit && (
            <button
              onClick={() => {
                setIsEdit(false);
                edit(id, true, false);
              }}
            >
              ✔
            </button>
          )}
        </div>
        <button
          onClick={() => {
            axios.delete(`http://localhost:3000/tasks/${id}`).then((res) => {
              console.log("successful");
              list[0](list[1]);
            });
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <hr />
    </>
  );
};
