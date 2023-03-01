import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import InformationCard from "./InformationCard";
import { columnsFromBackend } from "./dataCommunity";
import Sidebar from "../../components/sidebar/Sidebar";
import "./style.css";
import InputField from "./InputField";
import ExportExcel from 'react-export-excel'
import { Group } from "./models/group.models";
import { useDispatch, useSelector } from "react-redux";
import { excelCurrentComunity } from "../../actions/auth";
import Column from "./components/Column";
import { exportExcelApi } from "../../actions/group";
// import { group } from "../../utilities/group";
// import { groupByCommunity } from "../../utilities/groupByCommunity";
import { statusDataComunas } from "../../utilities/statusDataComunas";
import ellipsisOff from "../../assets/images/ellipsisOff.svg";
import { v4 as uuidv4 } from 'uuid';


const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Delete = styled.span`
  color: #951010;
  background: rgba(255, 255, 255, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
  cursor: pointer;
`;

// let object;

const Community = () => {
  const dispatch = useDispatch();
  const ExcelFile = ExportExcel.ExcelFile;
  const ExcelSheet = ExportExcel.ExcelSheet;
  const ExcelColumn = ExportExcel.ExcelColumn;
  const group = useSelector((state) => state.group.group);
  const groupByCommunity = useSelector((state) => state.group.groupByCommunity);

  const [search, setSearch] = useState({}); 
  const [filterCommunity, setFilterCommunity] = useState([]);
  const [currentDataExcel, setCurrentDataExcel] = useState(null);
  const [columns, setColumns] = useState();
  const [objectDrag, setObjectDrag] = useState();
  const [currentData, setCurrentData] = useState(null);
  const [deleteGroup, setDeleteGroup] = useState(null);
  const [currentEditColumn, setCurrentEditColumn] = useState([]);

  // Function Search
  const onSearchChange = (e, name) => {
    console.log("search2", search);
    console.log("name2", name);
    setSearch({...search, [`${name}`]: e.target.value});
  }

  useEffect(() => {
    console.log('search.', search);
  }, [search])
  

  const [uniqueCommunityName, setUniqueCommunityName] = useState(null);
  const [currentFilteredGroup, setCurrentFilteredGroup] = useState([])
  // let groupByCommunity = [];
  useEffect(() => {
    if( groupByCommunity.length > 0 && group.length > 0 ) {
      const groupCommunityIds = groupByCommunity.map((item) => item.id_grupo);
      const filtered =  group.filter((grupo) => {
        return groupCommunityIds.includes(grupo.id);
      })
      const communityGroup = groupByCommunity.map((item) => item.grupo);
      const uniqueCommunity = [...new Set(communityGroup)];
      setUniqueCommunityName(uniqueCommunity);
      let communityColumns = {};
      group.forEach((grp) => {
        const community = groupByCommunity.find((commun) => {
          return commun.id_grupo === grp.id;
        })
        if( community ){
          if(!communityColumns[community.grupo]) {
            communityColumns[community.grupo] = [];
          }
          communityColumns[community.grupo].push(grp);
        }
      })
      const groupCurrent = groupByCommunity.map((item) => item.id_grupo);
      console.log('groupCurrent', groupCurrent);
      console.log('group---', group);
      const filteredGroup =  group.filter((grupo) => {
        return !groupCurrent.includes(grupo.id);
      })
      console.log('filteredGroup', filteredGroup);
      setCurrentFilteredGroup(filteredGroup);
      console.log('communityColumns', communityColumns);
      let drag = Object.entries(communityColumns).map(([key, value], i) => {
        return {
          [value[i].id]: {
            name: key,
            color: "#FFFAE6",
            items: value
          }
        }
      });
      console.log('drag', drag);
      setFilterCommunity(drag);
      let object = drag.reduce((acc, item) => {
        acc[Object.keys(item)] = {
            name: Object.values(item)[0].name,
            color: "#FFFAE6",
            items: Object.values(item)[0].items
        }
        return acc
      }, {});
      console.log('object--', object);
      setObjectDrag(object);
      statusDataComunas(filteredGroup, object);
      console.log('statusDataComunas', statusDataComunas(filteredGroup, object));
      const crrData = statusDataComunas(filteredGroup, object).status;
      console.log('crrData', crrData);
      setColumns(crrData);
      return;
    } else if( group.length > 0 ){
      // setCurrentDataExcel(group);
      console.log('Entra a comunidades', group);
      const status = {
        [1]: {
          name: "Comunidades",
          color: "#FFFAE6",
          items: group
        },
      };
      setColumns(status);
    }
  }, [group, groupByCommunity])

  const [nameFile, setNameFile] = useState("");
  const [columns2, setColumns2] = useState();
  const [dragAndDrop, setDragAndDrop] = useState("");
  const [todos, setTodos] = useState([]);
  const [idDroppable, setIdDroppable] = useState([
    {
      id: "100",
      name: "comunidades Espejos",
      idGroup: "7882231",
    },
    {
      id: "100",
      name: "Comunidaddes Resoma",
      idGroup: "1020",
    },
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    // onFinish({ title });
    console.log(e.target.files);
    setNameFile(e.target.files[0].name);
    dispatch(excelCurrentComunity(e.target.files));
  };

  // const [idDroppable, setIdDroppable] = useState([
  //   {
  //     id_grupo: "100",
  //     grupo: "comunidades Espejos",
  //     id_grupo_community: 1000,
  //   },
  //   {
  //     id_grupo: "100",
  //     grupo: "Comunidades RIZ",
  //     id_grupo_community: 1020,
  //   },
  // ]);

  // Nombre de los campos para el excel idgrupo - name - id_grupo_community


  const handleAdd = (e) => {
    e.preventDefault();
    if (dragAndDrop.length > 0) {
      // setTodos([...columns, { id: Date.now(), name: dragAndDrop }]);
      setColumns({
        ...columns, 
      [Date.now()]: {
        name: dragAndDrop,
        color: "#FFFAE6",
        items: []
      }})
      setDragAndDrop("");
      console.log("dragAndDropx", dragAndDrop.length);
    }
  };

  useEffect(() => {
    dispatch(exportExcelApi());
  }, [])

  const onDragEnd = (result, columns, setColumns) => {
    console.log("result", result);

    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      console.log('entra');
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      console.log('entra', destItems);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      console.log('entra 2');
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  // useEffect(() => {
  //   const name = Object.values(status);
  //   const currentName = name.map((name) => {
  //     return name.name
  //   })
  //   console.log('currentName', currentName);
  //   const object = currentName.reduce((acc, item) => {
  //     console.log('item11!', item);
  //     acc[item] = ""
  //     return acc
  //   }, {})
  //   console.log('object--object', object);
  //   // setSearch(object);
  // }, [])

  // useEffect(() => {
  //   if(currentFilteredGroup.length > 0) {
  //     setCurrentFilteredGroup(arr => [deleteGroup, ...arr]);
  //     console.log('currentFilteredGroup5', currentFilteredGroup);
  //   }
  // }, [deleteGroup])

  // useEffect(() => {
  //   if(currentFilteredGroup.length > 0) {
  //     console.log('entra a la primera');
  //     status = {
  //       [1]: {
  //         name: "Comunidades",
  //         color: "#FFFAE6",
  //         items: currentFilteredGroup
  //       },
  //       ...object
  //     };
  //     console.log('status--3', status);
  //     setColumns(status);
  //   }
  // }, [currentFilteredGroup])

  // console.log('columns', columns);
  // console.log('urrentEditColumn', currentEditColumn);
  // useEffect(() => {
  //   if(currentEditColumn.length > 0){
  //     const filteredGroup =  group.filter((grupo) => {
  //       console.log('currentEditColumn[0].id', currentEditColumn[0].id);
  //       const currentIdEdit = [];
  //       currentIdEdit.push(currentEditColumn[0].id);
  //       return currentIdEdit.includes(grupo.id);
  //     })
  //     console.log('filteredGroupEdit', filteredGroup);
  //   }
  // }, [currentEditColumn])
  const [openModal, setOpenModal] = useState(false);
  const [nameModal, setNameModal] = useState(null);
  console.log('nameModal', nameModal);
  const [nameEdit, setNameEdit] = useState("");
  const handlePopupEdit = (open, name) => {
    setNameModal(name);
    if(open === true) {
      setOpenModal(true);
    }
  }

  const editCommunity = (item) => {
    console.log('itemsss', item);
    console.log('columnssss', columns);
    const drops = Object.values(columns).filter((column) => {
      console.log(column);
      if(column.name === item.name) {
        return column.name = nameEdit
      }
    })
    setOpenModal(false);
    // setColumns(...drops)
    console.log('drops', drops);
  }

  const handleInputEditChange = (e) => {
    console.log('e', e.target.value);
    setNameEdit(e.target.value);
  }

  const deleteGroupByCommunity = (item, columnId) => {
    delete objectDrag[columnId]
    console.log('objectDrag', objectDrag);
    console.log('columnId', columnId);
    // const currentColumn = Object.keys(columns).find((item) => item !== columnId)
    // console.log('currentColumn123', currentColumn)
    // const newItems = currentColumn.items.filter((item) => item.id !== columnId);
    const drops = Object.values(columns).filter((column) => {
      if(item.name !== column.name) {
        console.log('column', column.items);
        return column.items
      } else {
        console.log('...currentFilteredGroupitem', column.items);
        // setCurrentFilteredGroup(column.items);
        const col = column.items;
        col.forEach((element) => {
          currentFilteredGroup.push(element);
        });
        const status = {
          [0]: {
            name: "Comunidades",
            color: "#FFFAE6",
            items: currentFilteredGroup
          },
          ...objectDrag
        };
        console.log('status', status);
        // setColumns(status);
        // setDeleteGroup(column);
      }
    });
    setColumns(drops);
  }

  const deleteGroupBy = (id, column, idGroup, group) => {
    const currentColumn = Object.values(columns).find((item) => 
      item.name.toLocaleLowerCase() === column.name.toLocaleLowerCase());
    const newItems = currentColumn.items.filter((item) => item.id !== id);
    
    console.log('currentColumn', currentColumn);
    console.log('newItems', newItems);
    console.log('columns.idGroup', columns[idGroup]);
    columns[idGroup].items = newItems;
    currentFilteredGroup.push(group);
    const status = {
      [0]: {
        name: "Comunidades",
        color: "#FFFAE6",
        items: currentFilteredGroup
      },
      ...objectDrag
    };
    console.log('status', status);
    setCurrentData(status);
  }
  console.log('objectDrag', objectDrag);
  console.log('columns', columns);



  useEffect(() => {
    if(currentData) {
      console.log('currentData', currentData);
      setColumns(currentData);
    }
  }, [currentData])

  const handleSaveCommunity = (e) => {
    e.preventDefault();
    console.log('currentData...', columns);
    let objCommunity2 = [];
    const currentData = Object.values(columns).map( item => {
      item.items.forEach(itm => {
        const idIncrement = uuidv4();
        const objCommunity = {
          id: idIncrement,
          grupo: itm.name,
          id_grupo: itm.id,
          id_grupo_community: idIncrement,
        }
        console.log('objCommunity', objCommunity);
        objCommunity2.push(objCommunity);
      })
    });
    console.log('currentData', objCommunity2);

  }

  return (
    <Sidebar>
      <div className="row">
        <div className="card card-body">
          <div className="row mb-3">
            <div className="col-sm-12">
              <h4>Dar click
                <span className="excel">
                  <ExcelFile
                    element=" Aquí "
                    filename="Grupos"
                  >
                    <ExcelSheet
                      data={currentDataExcel}
                      name="Archivo Maestro"
                    >
                      <ExcelColumn label="_id" value="_id" />
                      <ExcelColumn label="name" value="name" />
                      <ExcelColumn label="id" value="id" />
                    </ExcelSheet>
                  </ExcelFile>
                </span>
                para exportar archivo de grupos de comunidades</h4>
            </div>
            <div className="col-sm-12">
              <div className="image-upload-wrap">
                <input
                  className="file-upload-input"
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={onSubmit}
                  multiple
                />
                <div className="text-information">
                  <h3>Importar Archivo Comunidades</h3>
                </div>
              </div>
              {nameFile ? (
                <>
                  <div className="currentFile d-flex">
                    {/* <div className="iconFile">
                      <span>Icono</span>
                    </div> */}
                    <span>{`${nameFile}`}</span>
                    {/* <div>
                      <span className="iconDelete" onClick={deleteFile}>
                        Delete
                      </span>
                    </div> */}
                  </div>
                  {/* <div className="dFlex">
                    <button className="btn btn-primary margen" onClick={saveExcel}>
                      Guardar Archivo
                    </button>
                  </div> */}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <InputField
              dragAndDrop={dragAndDrop}
              setDragAndDrop={setDragAndDrop}
              handleAdd={handleAdd}
              handleSaveCommunity={handleSaveCommunity}
              // handleDroppable={handleDroppable}
            />
          </div>
          <hr />
          <div className="container-group">
            {
              columns ? 
                <DragDropContext
                  onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                >
                  {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                      <div className="container-drop" key={columnId} >
                        <div className="d-flex justify-content-between">
                          <h5 className="title-group">{column.name}</h5>
                          <div className="btn-group btn-hover" role="group">
                            <button
                              id={`btnGroupDrop${index}`}
                              type="button"
                              class="btn mr-2 dropdown-toggle"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              style={{background: 'none'}}
                            >
                              <img src={ellipsisOff} alt="" className="" />
                            </button>
                            <div
                              class="dropdown-menu dropdown-style"
                              aria-labelledby={`btnGroupDrop${index}`}
                            >
                              <button
                                class="dropdown-item dropdown-style-button"
                                onClick={() => handlePopupEdit(true, column.name)}
                              >
                                {/* <img src={edit} height="12" className="" /> */}
                                Editar
                              </button>
                              <button
                                class="dropdown-item dropdown-style-button"
                                onClick={() => deleteGroupByCommunity(column, columnId)}
                              >
                                {/* <img src={deleted} height="12" className="" /> */}
                                Eliminar
                              </button>
                            </div>
                          </div>
                          {
                            openModal && nameModal === column.name
                            ?
                            <div className="quick-card-editor">
                              <div className="container-card-editor">
                                <h5>Editar Comunidad</h5>
                                <div className="col-sm-12 mt-4">
                                  <label className="title-label-popup">Nombre de la comunidad</label>
                                  <div className="form-group">
                                    <textarea class="card-editor" dir="auto" data-autosize="true" onChange={ (e)=>handleInputEditChange(e) }>{column.name}</textarea>
                                  </div>
                                  <input 
                                    class="drop-button-primary" 
                                    type="submit" 
                                    value="Editar"
                                    onClick={() => editCommunity(column)}
                                  ></input>
                                </div>
                              </div>
                            </div>
                            :
                              ""
                          }
                        </div>
                        {/* <div style={{ margin: 8, overflowY: "scroll" }}> */}
                          <Column
                            droppableId={columnId}
                            key={columnId}
                            index={index}
                            column={column}
                            search={search}
                            onSearchChange={onSearchChange}
                            setDeleteGroup={setDeleteGroup}
                            setColumns={setColumns}
                            currentFilteredGroup={currentFilteredGroup}
                            objectDrag={objectDrag}
                            setCurrentEditColumn={setCurrentEditColumn}
                            deleteGroupBy={deleteGroupBy}
                            currentData={currentData}
                          />
                        {/* </div> */}
                      </div>
                    );
                    })}
                </DragDropContext>
              :
                ""
            }
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Community;
