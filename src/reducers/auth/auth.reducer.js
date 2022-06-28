import { types } from "../../types/auth";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        accessToken: action.payload.accessToken,
        email: action.payload.email,
      };

    case types.logout:
      return {};

    default:
      return state;
  }
};
