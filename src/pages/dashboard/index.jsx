import React, { useState } from 'react'
import { excelCurrent } from '../../actions/auth';
import Sidebar from '../../components/sidebar/Sidebar';
import '../../styles/components/sidebar.css';
import ProtectedRoute from '../navigation/ProtectedRoute';
import {Copia_de_Maestras_VF} from '../../utils/Copia_de_Maestras_VF.xlsx'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import ExportExcel from 'react-export-excel';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [nameFile, setNameFile] = useState("");
  const { loading } = useSelector((state) => state.ui);
  const { accessToken, email } = useSelector((state) => state.auth)
  console.log(loading);

  const onSubmit = (e) => {
    e.preventDefault();
    // onFinish({ title });
    console.log(e.target.files);
    setNameFile(e.target.files[0].name);
    dispatch(excelCurrent(e.target.files));
  };

  const ExcelFile = ExportExcel.ExcelFile;
  const ExcelSheet = ExportExcel.ExcelSheet;
  const ExcelColumn = ExportExcel.ExcelColumn;

  const excel = [
    {
      id_curso: 706612,
      name_curso: "Dispositivos Electrónicos",
      sede: "01BOG",
      centro_administrativo: "Seccional",
      region: "CENTRO ORIENTE",
      cod_academica: "01IEC",
      org_academica: "Ingeniería Electrónica (C)",
      area_conocimiento: "Ingenierías",
      _id: 279589,
      doc_id: 7630363,
      nombre: "DUVAN",
      nombre2: "FELIPE",
      apellido: "BURITICA",
      apellido2: "CARDONA",
      email: "jormer.bermudez@campusucc.edu.co",
      contratacion: "CAT",
      cargo: "Decanos nacionales",
      rol: "Profesores",
      grupo_investigacion: "",
      celular: ""
    }
  ]

  // const saveExcel = (e: any) => {
  //   e.preventDefault();
  //   // onFinish({ title });
  //   console.log(e.target.files);

  // };

  // const deleteFile = (e) => {
  //   e.preventDefault();
  //   console.log("prueba!");
  //   setNameFile("");
  // };

  // const onHandleTitleChange = ({ target }) => {
  //   console.log(target.files);
  //   excelCurrent(target.files);
  // };

  return (
    <ProtectedRoute>
      <Sidebar>
        <span>El estado del token es: {`${accessToken}`}, y el email es:{`${email}`} </span>
      {
        loading 
        ? 
        <div className="row loading">
          <div className="offset-5">
            <ClipLoader color={"#123abc"} loading={loading} size={150} />
          </div>
        </div>
        
        :
        <>
        <br />
        <h4>Dar click
          <span className="excel">
            <ExcelFile
              element=" Aquí "
              filename="Archivo Maestro"
            >
              <ExcelSheet
                data={excel}
                name="Archivo Maestro"
              >
                <ExcelColumn label="id_curso" value="id_curso" />
                <ExcelColumn label="name_curso" value="name_curso" />
                <ExcelColumn
                  label="sede"
                  value="sede"
                />
                <ExcelColumn label="centro_administrativo" value="centro_administrativo" />
                <ExcelColumn
                  label="region"
                  value="region"
                />
                <ExcelColumn
                  label="cod_academica"
                  value="cod_academica"
                />
                <ExcelColumn label="org_academica" value="org_academica" />
                <ExcelColumn label="area_conocimiento" value="area_conocimiento" />
                <ExcelColumn label="_id" value="_id" />
                <ExcelColumn label="doc_id" value="doc_id" />
                <ExcelColumn label="nombre" value="nombre" />
                <ExcelColumn label="nombre2" value="nombre2" />
                <ExcelColumn label="apellido" value="apellido" />
                <ExcelColumn label="apellido2" value="apellido2" />
                <ExcelColumn label="email" value="email" />
                <ExcelColumn label="contratacion" value="contratacion" />
                <ExcelColumn label="cargo" value="cargo" />
                <ExcelColumn label="rol" value="rol" />
                <ExcelColumn label="grupo_investigacion" value="grupo_investigacion" />
                <ExcelColumn label="celular" value="celular" />
              </ExcelSheet>
            </ExcelFile>

          </span>
          para exportar archivo de muestra de maestro</h4>
        <div className="image-upload-wrap">
          <input
            className="file-upload-input"
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={onSubmit}
            multiple
          />
          <div className="text-information">
            <h3>Importar Archivo Maestro Rizoma</h3>
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
          
        </>
        }
      </Sidebar>
    </ProtectedRoute>
  )
}

export default Dashboard;