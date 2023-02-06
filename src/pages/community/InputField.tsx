import React from "react";

const InputField = ({
  dragAndDrop,
  setDragAndDrop,
  handleAdd,
  handleDroppable,
}: any) => {
  return (
    <div className="row" key="1">
      <form
        className="input"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("e", e);
          handleAdd(e);
          // inputRef.current?.blur();
        }}
      >
        <div className="offset-8 col-sm-4 d-flex justify-content-between">
          <input
            type="text"
            placeholder="Ingresa un nuevo grupo"
            value={dragAndDrop}
            // ref={inputRef}
            onChange={(e) => setDragAndDrop(e.target.value)}
            className="form-control"
            // className="input__box"
          />
          <button
            type="submit"
            className="btn"
            onClick={() => handleDroppable()}
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
