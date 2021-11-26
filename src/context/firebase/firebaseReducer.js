const handlers = {
  CREATE: (state, { payload }) => ({
    ...state,
    products: [...state.products, payload]
  }),
  FETCH: (state, { payload }) => ({
    ...state,
    products: payload
  }),
  REMOVE: (state, { payload }) => ({
    ...state,
    products: state.products.filter(item => item.id !== payload)
  }),
  UPDATE: (state, { payload }) => ({
    ...state,
    products: state.products.map(item =>
      item.id === payload.id ? payload : item
    )
  }),
  DEFAULT: state => state
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
