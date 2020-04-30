import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  Dashboard: "[Dashboard] Action"
};

const initialAuthState = {
  dashboard: undefined
};

export const reducer = persistReducer(
  { storage, key: "maiden-frontend-home", whitelist: ["dashboard"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Dashboard: {
        const { dashboard } = action.payload;

        return { dashboard };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  dashboard: dashboard => ({ type: actionTypes.Dashboard, payload: { dashboard } })
};

export function* saga() {
}
