import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  Dashboard: "[Dashboard] Action"
};

const initialAuthState = {
  data: undefined
};

export const reducer = persistReducer(
  { storage, key: "maiden-frontend-home", whitelist: ["data"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Dashboard: {
        const { data } = action.payload;

        return { data };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  setDashboard: data => ({ type: actionTypes.Dashboard, payload: { data } })
};

export function* saga() {
}
