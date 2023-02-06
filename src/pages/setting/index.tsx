import React, { useState } from "react";
// import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/comunidad.model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Sidebar from "../../components/sidebar/Sidebar";

const Setting: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      console.log("todo", todo);
      console.log("todos", todos);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log("result", result);
    const { destination, source } = result;
    console.log(result);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    console.log("CompletedTodos", CompletedTodos);
    setTodos(active);
  };

  return (
    <Sidebar>
      <div className="row">
        <div className="card card-body">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
              {/* <span className="heading">Taskify</span> */}
              <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
              <TodoList
                todos={todos}
                setTodos={setTodos}
                CompletedTodos={CompletedTodos}
                setCompletedTodos={setCompletedTodos}
              />
            </div>
          </DragDropContext>
        </div>
      </div>
    </Sidebar>
  );
};

export default Setting;
