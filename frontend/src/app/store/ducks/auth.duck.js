import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "../../service/auth.service";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  RefreshToken: "[Refresh Token] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  refreshToken: undefined
};

export const reducer = persistReducer(
  { storage, key: "maiden-frontend-auth", whitelist: ["user", "authToken", "refreshToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken, refreshToken } = action.payload;

        return { authToken, refreshToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken, refreshToken } = action.payload;

        return { authToken, refreshToken, user: undefined };
      }

      case actionTypes.RefreshToken: {
        const { authToken } = action.payload;

        return { ...state, authToken };
      }

      case actionTypes.Logout: {
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;

        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken, refreshToken) => ({
    type: actionTypes.Login,
    payload: { authToken, refreshToken }
  }),
  register: (authToken, refreshToken) => ({
    type: actionTypes.Register,
    payload: { authToken, refreshToken }
  }),
  refresh: (authToken) => ({
    type: actionTypes.RefreshToken,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: () => ({ type: actionTypes.UserRequested }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });
}
