import React from "react";

const InputField = ({
  dragAndDrop,
  setDragAndDrop,
  handleAdd,
  handleSaveCommunity,
}: // handleDroppable,
any) => {
  return (
    <div
      className="row justify-content-between"
      key="1"
      style={{ padding: "0 16px" }}
    >
      <button className="btn-community" onClick={handleSaveCommunity}>
        Guardar Comunidades
      </button>
      <form
        className="input"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("e", e);
          handleAdd(e);
          // inputRef.current?.blur();
        }}
      >
        <div className="d-flex justify-content-between">
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
            className="btn-community"
            // onClick={() => handleDroppable()}
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
