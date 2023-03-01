import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
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

function TaskCard({item, index, GroupByCommunity, editGroupByCommunity, setNameEdit, openModal, setOpenModal, column, droppableId }) {
  // console.log('itemitem', item);
  const [idModal, setIdModal] = useState(null);
  const handlePopupEdit = (open, id) => {
    setIdModal(id);
    if(open === true) {
      setOpenModal(true);
    }
  }

  const onSearchChange = (e) => {
    setNameEdit(e.target.value);
  }
  
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task-card d-flex justify-content-between"
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
            </div>
            <div className="close-drop">
              {/* <span className="fa-Edit" style={{marginRight: "5px"}} onClick={() => handlePopupEdit(true, item.id)}><FaEdit /></span> */}
              <span onClick={() => GroupByCommunity(item.id, column, droppableId, item)}><FaRegWindowClose /></span>
            </div>
            {
              openModal && idModal === item.id
              ?
               <div className="quick-card-editor">
                <div style={{width: "248px"}}>
                  <textarea class="card-editor" dir="auto" data-autosize="true" onChange={ (e)=>onSearchChange(e) }>{item.name}</textarea>
                </div>
                <input 
                  class="drop-button-primary" 
                  type="submit" 
                  value="Guardar"
                  onClick={() => editGroupByCommunity(item.id)}
                ></input>
               </div>
              :
                ""
            }
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
