import React, { useRef } from "react";
import "./styles.css";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(inputRef);

  return (
    <div className="row">
      <form
        className="input"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("e", e);
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <div className="offset-8 col-sm-4 d-flex justify-content-between">
          <input
            type="text"
            placeholder="Ingresa un nuevo grupo"
            value={todo}
            ref={inputRef}
            onChange={(e) => setTodo(e.target.value)}
            className="form-control"
            // className="input__box"
          />
          <button
            type="submit"
            className="btn"
            // className="input_submit"
          >
            Ingresa
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputField;
