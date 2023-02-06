import { loginLoading } from "../../types/auth";
import { SHOW_GROUP, SHOW_GROUP_SUCCESS, SHOW_GROUP_ERROR, SHOW_GROUPBYCOMMUNITY, SHOW_GROUPBYCOMMUNITY_SUCCESS, SHOW_GROUPBYCOMMUNITY_ERROR } from "../../types/group";
import { types } from "../../types/register";

const initialState = {
  loading: false,
  msgError: null,
  group: null,
  groupbycommunity: null
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginLoading.uiStartLoading:
      return {
        ...state,
        loading: true,
      };

    case loginLoading.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    case SHOW_GROUP:
      return {
        ...state,
        group: action.payload,
      };

    case SHOW_GROUPBYCOMMUNITY:
      return {
        ...state,
        groupByCommunity: action.payload,
      };

    default:
      return state;
  }
};
