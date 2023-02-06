import React from "react";

import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../models/comunidad.model";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Comunidad</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          console.log("provided", provided),
          console.log("snapshot", snapshot),
          (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`todos  ${
                snapshot.isDraggingOver ? "dragcomplete" : "remove"
              }`}
            >
              <span className="todos__heading">Comunidad Rizoma</span>
              {CompletedTodos?.map(
                (todo, index) => (
                  console.log("todo.id", todo.id),
                  (
                    <SingleTodo
                      index={index}
                      todos={CompletedTodos}
                      todo={todo}
                      key={todo.id}
                      setTodos={setCompletedTodos}
                    />
                  )
                )
              )}
              {provided.placeholder}
            </div>
          )
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove1">
        {(provided, snapshot) => (
          console.log("provided", provided),
          console.log("snapshot", snapshot),
          (
            <div
              ref="1"
              {...provided.droppableProps}
              className={`todos  ${
                snapshot.isDraggingOver ? "dragcomplete" : "remove"
              }`}
            >
              <span className="todos__heading">Comunidad Rizoma1</span>
              {CompletedTodos?.map(
                (todo, index) => (
                  console.log("todo.id", todo.id),
                  (
                    <SingleTodo
                      index={index}
                      todos={CompletedTodos}
                      todo={todo}
                      key={todo.id}
                      setTodos={setCompletedTodos}
                    />
                  )
                )
              )}
              {provided.placeholder}
            </div>
          )
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
