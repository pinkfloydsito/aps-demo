import { put, takeLatest, takeEvery, select, call } from "redux-saga/effects";
import Storage from '../../utils/Storage';

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
    const token = Storage.get('token')

    return {
      ...state,
      user : {...state.user , ...action.payload, token }
    }

    case actionTypes.SetToken:
    Storage.set('token', action.payload.token)
    return {
      ...state,
      user : {...state.user , ...action.payload }
    }

    case actionTypes.Logout:
    try {
      Storage.unset('token')
    } catch (err) {} finally {}
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

export function* saga() {}
