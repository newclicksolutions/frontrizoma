import clientAxios, { setAccessToken } from "../../config/axios";
import Swal from "sweetalert2";
import { finishLoading, starLoading } from "../ui";
import { SHOW_GROUP, SHOW_GROUPBYCOMMUNITY } from "../../types/group";


export const exportExcelApi = () => {
  return async (dispatch) => {
    console.log("entra al excel");
    dispatch(starLoading());
    try {
      await clientAxios
        .get("http://localhost:8000/groupbycommunity/", {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
            "content-type": "application/vnd.ms-excel;charset=UTF-8",
          },
        })
        .then((result) => {
          console.log("resultExcel", result.data);
          if (result.data.length === 0) {
            try {
              clientAxios
                .get("http://localhost:8000/group/", {
                  headers: {
                    "Content-Type":
                      "multipart/form-data; boundary=<calculated when request is sent>",
                    "content-type": "application/vnd.ms-excel;charset=UTF-8",
                  },
                })
                .then((result) => {
                  console.log("resultGroup", result);
                  dispatch(obtainGroupExcel(result.data));
                });
            } catch (error) {}
          }else {
            try {
              clientAxios
                .get("http://localhost:8000/group/", {
                  headers: {
                    "Content-Type":
                      "multipart/form-data; boundary=<calculated when request is sent>",
                    "content-type": "application/vnd.ms-excel;charset=UTF-8",
                  },
                })
                .then((result) => {
                  console.log("resultGroup", result);
                  dispatch(obtainGroupExcel(result.data));
                });
            } catch (error) {}
            dispatch(obtainGroupByCommunity(result.data));
          }
          // if (
          //   result.data.data.message == "Import succesfully" ||
          //   result.status == 201 ||
          //   result.status == 200
          // ) {
          //   Swal.fire("Correcto", "Archivo importado correctamente", "success");
          //   dispatch(finishLoading());
          // }
        });
      // if (data.data.message) {
      //   Swal.fire("Archivo Guardado!");
      // }
      // console.log(data.data.message);
    } catch (error) {
      console.log(error);
    }
  };
};

const obtainGroupExcel = (item) => ({
  type: SHOW_GROUP,
  payload: item,
});

const obtainGroupByCommunity = (item) => ({
  type: SHOW_GROUPBYCOMMUNITY,
  payload: item,
});

export const handlerCommunity = (items) => {
  return async (dispatch) => {
    dispatch(starLoading());
    const objeto = {items};
    console.log('objeto', objeto);
    try {
      await clientAxios
        .post("http://localhost:8000/groupbycommunity", objeto, {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
            "content-type": "application/vnd.ms-excel;charset=UTF-8",
          },
        })
        .then((result) => {
          console.log(result);
          // if (
          //   result.data.data.message == "Import succesfully" ||
          //   result.status == 201 ||
          //   result.status == 200
          // ) {
          //   Swal.fire("Correcto", "Archivo importado correctamente", "success");
          //   dispatch(finishLoading());
          // }
        });
      // if (data.data.message) {
      //   Swal.fire("Archivo Guardado!");
      // }
      // console.log(data.data.message);
    } catch (error) {
      console.log(error);
    }
  };
};