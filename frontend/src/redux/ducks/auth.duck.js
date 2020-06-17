import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  SetUser: "[SetUser] Action",
  SetToken: "[SetToken] Action",
  Logout: "[Logout] Action",
};

const initialAuthState = {
  user: undefined,
};


export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SetUser:
    return {
      ...state,
      user : {...state.user , ...action.payload }
    }

    case actionTypes.SetToken:
    return {
      ...state,
      user : {...state.user , ...action.payload }
    }

    case actionTypes.Logout:
    return {
      ...state,
      user : undefined
    }

    default:
      return state
  }
}


export const actions = {
  login: ( { token } ) => ({ type: actionTypes.SetToken, payload: { token }  }),
  setUser: ( { username, email } ) => ({ type: actionTypes.SetUser, payload: { username, email }  }),
  register: token => ({
    type: actionTypes.SetToken,
    payload: { token }
  }),
  logout: () => ({ type: actionTypes.Logout }),
};

export function* saga() {
}
