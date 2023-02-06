import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import InformationCard from "./InformationCard";
import { columnsFromBackend } from "./dataCommunity";
import Sidebar from "../../components/sidebar/Sidebar";
import "./style.css";
import InputField from "./InputField";
// import ExportExcel from "react-export-excel";
import { Group } from "./models/group.models";

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
  // const ExcelFile = ExportExcel.ExcelFile;
  // const ExcelSheet = ExportExcel.ExcelSheet;
  // const ExcelColumn = ExportExcel.ExcelColumn;
  const [columns, setColumns] = useState(columnsFromBackend);

  const [dragAndDrop, setDragAndDrop] = useState("");
  const [todos, setTodos] = useState<Array<Group>>([]);
  const [idDroppable, setIdDroppable] = useState([
    {
      id: "100",
      name: "comunidades Espejos",
      idGroup: "1000",
    },
    {
      id: "100",
      name: "Comunidaddes Resoma",
      idGroup: "1020",
    },
  ]);

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

  console.log("idDroppable", idDroppable);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (dragAndDrop) {
      setTodos([...todos, { id: Date.now(), name: dragAndDrop }]);
      console.log("dragAndDrop", todos);
    }
  };

  console.log("dragAndDrop--", dragAndDrop);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    console.log("result", result);

    if (!result.destination) return;
    const { source, destination } = result;
    console.log("source--", source);
    console.log("source.droppableId", source.droppableId);
    console.log("destination.droppableId", destination.droppableId);
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
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
      console.log("column---", column);
      const copiedItems = column;
      console.log("copiedItems", copiedItems);
      console.log("source.index", source.index);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
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
      setIdDroppable((result: any) => [currentDroppable, ...result]);
    }
  }, [currentDroppable]);
  console.log("objectValues", Object.values(idDroppable));

  return (
    <Sidebar>
      <div className="row">
        <div className="card card-body">
          <div className="row mb-3">
            <div className="col-sm-12">
              <h4>
                Dar click
                {/* <span className="excel">
                  <ExcelFile element=" Aquí " filename="Archivo Maestro">
                    <ExcelSheet
                      data={columnsFromBackend}
                      name="Archivo Maestro"
                    >
                      <ExcelColumn label="_id" value="_id" />
                      <ExcelColumn label="name" value="name" />
                      <ExcelColumn label="id" value="id" />
                    </ExcelSheet>
                  </ExcelFile>
                </span> */}
                para exportar archivo de muestra de maestro
              </h4>
            </div>
            <div className="col-sm-12">
              <div className="image-upload-wrap">
                <input
                  className="file-upload-input"
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  // onChange={onSubmit}
                  multiple
                />
                <div className="text-information">
                  <h3>Importar Archivo Comunidades</h3>
                </div>
              </div>
            </div>
          </div>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            <InputField
              dragAndDrop={dragAndDrop}
              setDragAndDrop={setDragAndDrop}
              handleAdd={handleAdd}
              handleDroppable={handleDroppable}
            />
            <div className="row">
              <div className="col-sm-6">
                <Container>
                  <TaskColumnStyles className="dropp">
                    <Droppable key="1" droppableId="1">
                      {(provided, snapshot) => (
                        <TaskList
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <Title>Comunidades</Title>
                          {columns.map((item: any, index: any) => (
                            <InformationCard
                              key={item}
                              item={item}
                              index={index}
                            />
                          ))}
                          {provided.placeholder}
                        </TaskList>
                      )}
                    </Droppable>
                    {idDroppable.map(
                      (dropp) => (
                        console.log("dropp<!", dropp),
                        (
                          <Droppable
                            key={dropp.idGroup}
                            droppableId={dropp.idGroup}
                          >
                            {(provided, snapshot) => (
                              <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                <div className="d-flex justify-content-between">
                                  <Title>{dropp.name}</Title>
                                  <Delete>x</Delete>
                                </div>
                                {groupsIds.map((item: any, index: any) =>
                                  item.idGroup === dropp.idGroup ? (
                                    <InformationCard
                                      key={item}
                                      item={item}
                                      index={index}
                                      dropp={dropp}
                                    />
                                  ) : (
                                    ""
                                  )
                                )}
                                {provided.placeholder}
                              </TaskList>
                            )}
                          </Droppable>
                        )
                      )
                    )}
                  </TaskColumnStyles>
                </Container>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </Sidebar>
  );
};

export default Community;
