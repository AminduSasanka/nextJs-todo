import { useRef, useState, useEffect } from "react";
import TodoList from "./TodoList";
import Banner from "./Banner";
import styles from "./Todo.module.css";

const Todo = ({ fetchedData }) => {
  const itemInput = useRef(null);
  const [todoList, setTodoList] = useState(fetchedData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState();
  const [banner, setBanner] = useState({
    showBanner: false,
    class: "",
    content: "",
  });

  useEffect(() => {
    fetchData();
  }, [banner]);

  //
  //
  // database functions
  // get - fetchData(), post - addTodo(), patch, delete
  //
  const addTodo = async (item) => {
    try {
      const response = await fetch("./api/todo-api", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setBanner({
        showBanner: true,
        class: "success",
        content: "item added",
      });

      return response;
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("./api/todo-api", { method: "GET" });
      const list = await response.json();
      setTodoList(list.todoList);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch("./api/todo-api", {
        method: "DELETE",
        body: itemId,
      });

      setBanner({
        showBanner: true,
        class: "danger",
        content: "item deleted",
      });

      return response;
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const updateItem = async (item) => {
    try {
      const response = await fetch("./api/todo-api", {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setBanner({
        showBanner: true,
        class: "success",
        content: "item updated",
      });
      return response;
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const clearList = async () => {
    try {
      const response = await fetch("./api/todo-api", {
        method: "PUT",
        body: "",
      });
      setBanner({
        showBanner: true,
        class: "danger",
        content: "item deleted",
      });
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  //
  //
  //
  //

  const submitHandler = (e) => {
    e.preventDefault();
    let newItem = itemInput.current.value;

    if (!newItem) {
      setBanner({
        showBanner: true,
        class: "danger",
        content: "invalid input",
      });
    } else if (newItem && isEditing) {
      let editedItem = { id: editingId, content: itemInput.current.value };
      updateItem(editedItem);
      itemInput.current.value = "";
      setIsEditing(false);
    } else {
      let newListItem = {
        id: new Date().getTime().toString(),
        content: newItem,
      };
      addTodo(newListItem);
      itemInput.current.value = "";
    }
  };

  const editHandler = (item) => {
    setIsEditing(true);
    setEditingId(item.id);
    itemInput.current.value = item.content;
  };

  const closeBanner = () => {
    setBanner({ showBanner: false, class: "", content: "" });
  };

  return (
    <div className={`card shadow ${styles.todo_container}`}>
      <h3 className={`mb-3 ${styles.title}`}>Todo</h3>
      <form onSubmit={submitHandler}>
        <input ref={itemInput} type="text" className="form-control" />
        <button type="submit" className="btn">
          {isEditing ? "edit item" : "add item"}
        </button>
      </form>
      <div className={`${banner.class} ${styles.banner}`}>
        {banner.showBanner && (
          <Banner content={banner.content} closeBanner={closeBanner}></Banner>
        )}
      </div>
      <TodoList
        list={todoList}
        deleteItem={deleteItem}
        editHandler={editHandler}
      ></TodoList>
      {!todoList.length == 0 && (
        <button onClick={clearList} className={styles.clear_btn}>
          {" "}
          clear list{" "}
        </button>
      )}
    </div>
  );
};

export default Todo;
