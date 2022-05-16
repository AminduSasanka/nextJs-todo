import styles from "./TodoList.module.css";
import { RiEditLine, RiDeleteBin5Line } from "react-icons/ri";
import { BsCardChecklist } from "react-icons/bs";

const TodoList = ({ list, deleteItem, editHandler }) => {
  if (list.length !== 0) {
    return (
      <div className={` mt-2 ${styles.todoList_container}`}>
        {list.map((listItem) => {
          return (
            <div key={listItem.id} className={styles.listItem_container}>
              <p> {listItem.content}</p>
              <div>
                <button onClick={() => editHandler(listItem)}>
                  <RiEditLine></RiEditLine>
                </button>
                <button onClick={() => deleteItem(listItem.id)}>
                  <RiDeleteBin5Line></RiDeleteBin5Line>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center my-4">
        <i className="opacity-25 d-flex" style={{ fontSize: "10rem" }}>
          <BsCardChecklist></BsCardChecklist>
        </i>
        <p className="opacity-25 text-center fw-bold"> keep your todo here </p>
      </div>
    );
  }
};

export default TodoList;
