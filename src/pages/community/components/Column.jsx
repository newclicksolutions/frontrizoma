import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Column = ({ droppableId, column, search, onSearchChange, setDeleteGroup, setColumns, currentFilteredGroup, objectDrag, setCurrentEditColumn, deleteGroupBy, currentData }) => {
  console.log('setColumns3', column);
  const [drop, setDrop] = useState(column.items || []);
  const [filterDrop, setFilterDrop] = useState(drop);
  const [currentDrop, setCurrentDrop] = useState(drop);
  const [openModal, setOpenModal] = useState(false);
  console.log('drop1', column.items);
  console.log('drop2', drop);
  
  useEffect(() => {
    const searchTxt = search[column.name];
    if(searchTxt !== undefined) {
      if(searchTxt) {
        const drops = drop.filter((item) => {
          const name = item.name.toLocaleLowerCase();
          return name.includes(searchTxt.toLocaleLowerCase());
        })
        setFilterDrop(drops);
      } else {
        setFilterDrop(drop);
      }
    }
  }, [search])

  // const deleteGroupByCommunity = (id) => {
  //   const drops = drop.filter((item) => {
  //     if(id !== item.id) {
  //       // console.log('item', item);
  //       // const col = column.items;
  //       // col.forEach((element) => {
  //       //   currentFilteredGroup.push(element);
  //       // });
  //       // console.log('col', col);
  //       return item;
  //     } else {
  //       console.log('...currentFilteredGroup', currentFilteredGroup);
  //       console.log('...currentFilteredGroupitem', item);
  //       currentFilteredGroup.push(item);
  //       // objectDrag.filter((object) => {
  //       //   console.log('object', object);
  //       // })
  //       // console.log('objectDrag', objectDrag);
  //       // let obarr;
  //       // const arrObjectDrag = Object.values(objectDrag);
  //       // arrObjectDrag.filter((arr) => {
  //       //   console.log('arr', arr.items);
  //       //   obarr = arr.items.map(utm => {
  //       //     console.log('utm', utm);
  //       //     if(utm.id !== id) {
  //       //       return utm
  //       //     }
  //       //   })
  //       // })
  //       // console.log('arrObjectDrag', arrObjectDrag);
  //       // console.log('obarr', obarr);
  //       const status = {
  //         [0]: {
  //           name: "Comunidades",
  //           color: "#FFFAE6",
  //           items: currentFilteredGroup
  //         },
  //         ...objectDrag
  //       };
  //       console.log('objectDrag', objectDrag);
  //       // console.log('...currentFilteredGroupitem2', Object.values(status));
  //       // const arrStatus = Object.values(status).forEach((statu, index) => {
  //       //   // return statu.items.includes();
  //       //   // const arr = statu.items.entrie
  //       //   statu.items.map((item) => {
  //       //     console.log('item123', item);
  //       //     if(item.id !== id) {
              
  //       //     }
  //       //   })
  //       //   console.log('statu', statu.items); 
  //       //   console.log('statuindex', index); 
  //       // });
  //       setColumns(status);
  //       // setDeleteGroup(item);
  //     }
  //   });
  //   console.log('dropsss', drops);
  //   setDrop(drops);
  // }

  const [nameEdit, setNameEdit] = useState("");

  const editGroupByCommunity = (id) => {
    setOpenModal(false);
    const drops = drop.filter((item) => {
      if(id === item.id) {
        return item.name = nameEdit;
      }
    })
  }
  
  // useEffect(() => {
  //   console.log('currentCoumn1', column);
  //   setFilterDrop(drop);
  // }, [drop])
  
  useEffect(() => {
    console.log('currentCoumn', column);
    setFilterDrop(column.items);
  }, [column])
  console.log('filterDrop123', column);
  console.log('filterDroplength', filterDrop.length);

  useEffect(() => {
    if(currentData) {
      console.log('currentData');
      const lol = Object.entries(currentData).forEach(([columnId, column], index) => {
        console.log('...column', column.items);
        return column.items;
      })
      setFilterDrop(column.items);
    }
  }, [currentData])

  const items_per_page = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPage, setItemsPage] = useState([...filterDrop].splice(0, items_per_page));
  console.log('itemsPage', itemsPage);
  const [currentPageAfter, setCurrentPageAfter] = useState(itemsPage.length);
  const [currentPageBefore, setCurrentPageBefore] = useState(1);

  const nextHandler = () => {
    const totalElement = filterDrop.length;
    const nextPage = currentPage + 1;
    console.log('firstnextPage', nextPage);
    const firstIndex = nextPage * items_per_page;
    const currentAfter = firstIndex + 1;
    console.log('firstIndexNext', firstIndex);
    setCurrentPageAfter(firstIndex + itemsPage.length);
    setCurrentPageBefore(firstIndex + 1);
    if(firstIndex === totalElement) return;
    setItemsPage([...filterDrop].splice(firstIndex, items_per_page))
    setCurrentPage(nextPage);
    console.log('nextHandler...');
  }
  
  const prevHandler = () => {
    console.log('prevHandler', filterDrop);
    const prevPage = currentPage - 1;
    console.log('firstprevPage', prevPage);
    const firstIndex = prevPage * items_per_page;
    console.log('firstIndexPrev', firstIndex);
    setCurrentPageAfter(firstIndex - itemsPage.length);
    setCurrentPageBefore(firstIndex - 1);
    if(prevPage < 0) return; 
    setItemsPage([...filterDrop].splice(firstIndex, items_per_page))
    setCurrentPage(prevPage);
  }

  console.log('currentPage---', currentPage);

  useEffect(() => {
    setItemsPage([...filterDrop].splice(0, items_per_page));
    console.log('Entra al filter cuantas veces?');
  }, [filterDrop])
  

  return (
    <Droppable droppableId={droppableId.toString()} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <>
            <div style={{margin: "8px"}}>
              <input
                type="text"
                className="mb-2 form-control"
                placeholder={`Buscar ${column.name}`}
                // name={column.name}
                // value={`${search}${droppableId}`}
                onChange={ (e)=>onSearchChange(e, column.name) }
                id={column.name}
              />
            </div>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                // background: snapshot.isDraggingOver ? "lightblue" : column.color,
                padding: 4,
                width: 250,
                minHeight: 350,
                height: 0,
                margin: 8,
                overflowY: "overlay",
                // border: "2px dashed #ccc",
                borderRadius: "4px"
              }}
              id={column.name}
              className="others-drops"
            >
              {/* hay que llamar en la funcion del index el con el column o acá mismo llamar mirar que pasa con el setDrop que le estoy enviando column */}
              {/* {column?.items?.map((item, index) => { */}
                {itemsPage.map((item, index) => {
                  return (
                    <TaskCard 
                      key={item.id} 
                      item={item} 
                      index={index} 
                      GroupByCommunity={deleteGroupBy} 
                      editGroupByCommunity={editGroupByCommunity} 
                      setNameEdit={setNameEdit}
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      column={column}
                      droppableId={droppableId}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
            <div className="pagination">
              <div className="arrows">
                <FaArrowLeft onClick={prevHandler}/>
              </div>
              <span className="mt-2">{`${currentPageBefore} - ${currentPageAfter} de ${filterDrop.length}`}</span>
              <div className="arrows">
                <FaArrowRight onClick={nextHandler} />
              </div>
            </div>
          </>
        );
      }}
    </Droppable>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  droppableId: PropTypes.string
};

export default memo(Column);
