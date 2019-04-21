import { createStore } from "redux";

const initialState = { foo: "" };

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "FOO":
      return { ...state, foo: action.payload };
    default:
      return state;
  }
};

export function makeStore(initialState, { isServer }) {
  initialState = initialState || reducer();

  if (isServer) {
    return createStore(reducer, initialState);
  } else {
    const { persistReducer, persistStore } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistedReducer = persistReducer(
      {
        key: "nextjs",
        storage
      },
      reducer
    );
    const store = createStore(persistedReducer, initialState);

    store.__persistor = persistStore(store);

    return store;
  }
}
