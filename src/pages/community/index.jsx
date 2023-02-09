import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import InformationCard from "./InformationCard";
import { columnsFromBackend, status } from "./dataCommunity";
import Sidebar from "../../components/sidebar/Sidebar";
import "./style.css";
import InputField from "./InputField";
import ExportExcel from 'react-export-excel'
import { Group } from "./models/group.models";
import { useDispatch, useSelector } from "react-redux";
import { excelCurrentComunity } from "../../actions/auth";
import Column from "./components/Column";
import { exportExcelApi } from "../../actions/group";


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

const Community = () => {
  const dispatch = useDispatch();
  const ExcelFile = ExportExcel.ExcelFile;
  const ExcelSheet = ExportExcel.ExcelSheet;
  const ExcelColumn = ExportExcel.ExcelColumn;
  const group = useSelector((state) => state.group.group);
  const groupByCommunity = useSelector((state) => state.group.groupByCommunity);
  const [currentDataExcel, setCurrentDataExcel] = useState(null)
  console.log('groupState', group);
  console.log('groupByCommunity', groupByCommunity);
  let status;
  useEffect(() => {
    // if( groupByCommunity !== null){
    //   setCurrentDataExcel(groupByCommunity);
    // } else 
    if( group !== null || group !== undefined){
      setCurrentDataExcel(group);
      status = {
        [1]: {
          name: "Grupos",
          color: "#FFFAE6",
          items: group
        },
      };
      setColumns(status);
    }
  }, [group, groupByCommunity])
  console.log('currentDataExcel', currentDataExcel);
  const [nameFile, setNameFile] = useState("");
  const [columns, setColumns] = useState();
  const [columns2, setColumns2] = useState();
  console.log('columns--', columns);
  console.log('columns2--', columns2);
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
  //   {
  //     id_grupo: "120693440512",
  //     grupo: "Materiales",
  //     id_grupo_community: 2
  //   },
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
  //   {
  //     id_grupo: "120693440512",
  //     grupo: "Materiales",
  //     id_grupo_community: 2
  //   },
  // ]);

  // Nombre de los campos para el excel idgrupo - name - id_grupo_community

  console.log("idDroppable", idDroppable);

  const handleAdd = (e) => {
    e.preventDefault();
    if (dragAndDrop.length > 0) {
      // setTodos([...columns, { id: Date.now(), name: dragAndDrop }]);
      setColumns({
        ...columns, 
      [Date.now()]: {
        name: dragAndDrop,
        color: "#FFFAE6",
        items: [
        //   {
        //   name: "Materiales3",
        //   id: "82175940012223",
        // }
      ]
      }})
      setDragAndDrop("");
      console.log("dragAndDropx", dragAndDrop.length);
    }
  };

  useEffect(() => {
    dispatch(exportExcelApi());
    // console.log("columns", columns);
    // setColumns({
    //   ...columns, 
    // ["123333"]: {
    //   name: "Requested2",
    //   color: "#FFFAE6",
    //   items: [{
    //     name: "Materiales2",
    //     id: "8217594001222",
    //   }]
    // }})
  }, [])

  console.log("dragAndDrop--", dragAndDrop);

  const onDragEnd = (result, columns, setColumns) => {
    console.log("result", result);

    if (!result.destination) return;
    const { source, destination } = result;
    console.log("source--", source);
    console.log("source.droppableId", source.droppableId);
    if (source.droppableId !== destination.droppableId) {
      console.log("destination.droppableId", destination.droppableId);
      console.log("destination", destination);
      console.log('columns--', columns);
      console.log('enrtra if 1');
      const sourceColumn = columns[source.droppableId];
      console.log('sourceColumn', sourceColumn);
      const destColumn = columns[destination.droppableId];
      console.log('destColumn', destColumn);
      const sourceItems = [...sourceColumn.items];
      console.log('sourceItems', sourceItems);
      const destItems = [...destColumn.items];
      console.log("destItems", destItems);
      const [removed] = sourceItems.splice(source.index, 1);
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
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      console.log("copiedItems", copiedItems);
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

  const [currentDroppable, setCurrentDroppable] = useState({
    id: 0,
    name: "",
  });

  const groupsIds = [
    {
      id: "10000",
      name: "Gruposxx1",
      idGroup: "1000",
    },
    {
      id: "1000000",
      name: "Gruposxx2",
      idGroup: "1020",
    },
    {
      id: "1000000",
      name: "Gruposxx3",
      idGroup: "1020",
    },
    {
      id: "1000000",
      name: "Gruposxx4",
      idGroup: "1000",
    },
  ];

  const handleDroppable = () => {
    setCurrentDroppable((exampleState) => ({
      ...exampleState,
      id: Date.now(),
      name: dragAndDrop,
      idGroup: Date.now(),
    }));
    console.log("currentDroppable1", currentDroppable);
  };

  console.log("currentDroppable2", currentDroppable === null);

  useEffect(() => {
    if (currentDroppable.id !== 0) {
      setIdDroppable((result) => [currentDroppable, ...result]);
    }
  }, [currentDroppable]);
  
  console.log("objectValues", Object.values(idDroppable));

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
          <InputField
            dragAndDrop={dragAndDrop}
            setDragAndDrop={setDragAndDrop}
            handleAdd={handleAdd}
            handleDroppable={handleDroppable}
          />
          <hr />
          <div className="container-group">
            {
              columns ? 
                <DragDropContext
                  onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                >
                  {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                        key={columnId}
                      >
                        <h2>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                          <Column
                            droppableId={columnId}
                            key={columnId}
                            index={index}
                            column={column}
                          />
                        </div>
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
