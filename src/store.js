import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "./reducers/category";

const store = configureStore({
    reducer: {
        category: widgetReducer
    }
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;