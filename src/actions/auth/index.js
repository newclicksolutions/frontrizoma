import clientAxios, { setAccessToken } from "../../config/axios";
import { types } from "../../types/auth";
import Swal from "sweetalert2";
import { finishLoading, starLoading } from "../ui";
import { getUser, signIn } from "../../services/userService";

// Action types
const login = (accessToken, email) => ({
  type: types.login,
  payload: {
    accessToken,
    email,
  },
});

const logout = () => ({
  type: types.logout,
});

export const startLoginEmailPassword = (email, user_pass) => {
  return async (dispatch) => {
    console.log(email);
    console.log(user_pass);
    dispatch(starLoading());
    try {
      const data = { email, password: user_pass };
      const result = await signIn(data);
      console.log(result);
      const { accessToken } = result.data;
      setAccessToken(accessToken);
      dispatch(login(accessToken, email));
      dispatch(getUserAction());
      dispatch(finishLoading());
    } catch (error) {
      console.log(error);
      dispatch(finishLoading());
    }
  };
};

export const getUserAction = () => {
  return async () => {
    try {
      const rs = await getUser();
      console.log(rs);
    } catch (error) {}
  };
};

export const startRegisterWithEmailPassword = (
  user_id,
  name,
  last_name,
  email,
  user_pass
) => {
  return async (dispatch) => {
    try {
      // let history = useNavigate();
      const objeto = {};
      objeto.user_id = user_id;
      objeto.name = name;
      objeto.last_name = last_name;
      objeto.email = email;
      objeto.user_pass = user_pass;
      // console.log("objeto", objeto);
      await clientAxios
        .post("/auth/register", objeto, {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        })
        .then((result) => {
          if (result.data.message === "user register") {
            Swal.fire("Correcto", "¡Usuario creado correctamente!", "success");
          }
          console.log(result.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

// setTimeout(() => {
//   history.push("/auth/login");
// }, 3000);

// Dashboard

export const excelCurrent = (info) => {
  return async (dispatch) => {
    console.log("infooo", info[0]);
    dispatch(starLoading());
    try {
      const name = "file";
      const url = info;
      const formData = new FormData();
      for (const file in url) {
        formData.append(name, url[file]);
      }
      await clientAxios
        .post("http://localhost:8000/maestra/import", formData, {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
            "content-type": "application/vnd.ms-excel;charset=UTF-8",
          },
        })
        .then((result) => {
          console.log(result.status);
          if (
            result.data.data.message == "Import succesfully" ||
            result.status == 201 ||
            result.status == 200
          ) {
            Swal.fire("Correcto", "Archivo importado correctamente", "success");
            dispatch(finishLoading());
          }
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

export const signOutAction = () => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      // const result = await signOut(data);
      setAccessToken("");
      dispatch(logout());
      dispatch(getUserAction());
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      console.log(error);
    }
  };
};

// Comunity

export const excelCurrentComunity = (info) => {
  return async (dispatch) => {
    console.log("infooo", info[0]);
    dispatch(starLoading());
    try {
      const name = "file";
      const url = info;
      const formData = new FormData();
      for (const file in url) {
        formData.append(name, url[file]);
      }
      await clientAxios
        .post("http://localhost:8000/groupbycommunity/import", formData, {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
            "content-type": "application/vnd.ms-excel;charset=UTF-8",
          },
        })
        .then((result) => {
          console.log(result.status);
          if (
            result.data.data.message == "Import succesfully" ||
            result.status == 201 ||
            result.status == 200
          ) {
            Swal.fire("Correcto", "Archivo importado correctamente", "success");
            dispatch(finishLoading());
          }
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
          console.log("resultExcel", result.data.length);
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
                });
            } catch (error) {}
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
