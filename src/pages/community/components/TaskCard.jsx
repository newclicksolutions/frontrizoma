import React, { memo } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
// import "../styles.css";

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 50px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
`;

function TaskCard({ item, index }) {
  console.log('itemitem', item);
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task-card"
            style={{
              // userSelect: "none",
              // padding: 16,
              // margin: "0 0 8px 0",
              // minHeight: "50px",
              backgroundColor: snapshot.isDragging ? "#263b4a69" : "#fff",
              // color: "white",
              // borderRadius: "4px",
              ...provided.draggableProps.style
            }}
          >
            <div className="conten-card">
              <p>{item.name}</p>
            {/* <TaskInformation>
            </TaskInformation> */}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

TaskCard.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object
};

export default memo(TaskCard);
