import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/auth/useForm";
import { useHistory } from "react-router-dom";
import "../../styles/components/login.css"
import NoAuthRoute from "../../pages/navigation/NoAuthRoute";
import ClipLoader from "react-spinners/ClipLoader";

const LoginScreen = () => { 
  const dispatch = useDispatch(); 
  
  const history = useHistory();

  const { loading } = useSelector((state) => state.ui);
  console.log(loading);

  const [formValues, handleInputChange] = useForm({
    email: "",
    user_pass: "",
  });

  const { email, user_pass } = formValues;

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   dispatch(startLoginEmailPassword(email, user_pass));
  //   // history.push("/dashboard");
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, user_pass));
  };

  return (
    <NoAuthRoute>
      {
        loading 
        ? 
        <div className="row loading">
          <div className="offset-5">
            <ClipLoader color={"#123abc"} loading={loading} size={150} />
          </div>
        </div>
        
        :
        <div className="container container-login">
        <div className="row">
          <h3 className="auth__title">Login</h3>
          <form>
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              className="auth__input"
              autoComplete="off"
              value={email}
              onChange={handleInputChange}
            />

            <input
              type="password"
              placeholder="Password"
              name="user_pass"
              className="auth__input"
              value={user_pass}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
            

            <div className="auth__social-networks d-none">
              <p>Login with social networks</p>

              <div className="google-btn">
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="google button"
                  />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </div>
            </div>
            {/* <div className="mt-2">
              <Link to="/auth/register" className="link">
                Create new account
              </Link>
            </div> */}
          </form>
        </div>
      </div>
        }
    </NoAuthRoute>
  );
};

export default LoginScreen;
