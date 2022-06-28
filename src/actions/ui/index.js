import { loginLoading } from "../../types/auth";
import { types } from "../../types/register";

export const setError = (err) => ({
  type: types.uiSetError,
  payload: err,
});

export const removeError = (err) => ({
  type: types.uiRemoveError,
});

export const starLoading = () => ({
  type: loginLoading.uiStartLoading,
});

export const finishLoading = () => ({
  type: loginLoading.uiFinishLoading,
});
