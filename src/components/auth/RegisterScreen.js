import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/auth/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPassword } from "../../actions/auth";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { loading, msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    user_id: 13,
    name: "",
    last_name: "",
    email: "",
    user_pass: "",
    user_pass2: "",
  });

  const { user_id, name, last_name, email, user_pass, user_pass2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(
        startRegisterWithEmailPassword(
          user_id,
          name,
          last_name,
          email,
          user_pass
        )
      );
      console.log("Formulario correcto");
    }
    console.log(name, last_name, email, user_pass, user_pass2);
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("El nombre no es valido"));
      // console.log("El nombre no es valido");
      return false;
    } else if (last_name.trim().length === 0) {
      dispatch(setError("El apellido no es valido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("El Correo no es valido"));
      return false;
    } else if (user_pass !== user_pass2 && user_pass.length < 5) {
      dispatch(
        setError("la contraseña debe tener al menos 6 caracteres y coincidir")
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>
        {loading && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Apellido"
          name="last_name"
          className="auth__input"
          autoComplete="off"
          value={last_name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Correo"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Contraseña"
          name="user_pass"
          className="auth__input"
          value={user_pass}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirmar Contraseña"
          name="user_pass2"
          className="auth__input"
          value={user_pass2}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
