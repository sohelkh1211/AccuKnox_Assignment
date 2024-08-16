import { act } from "react";
import widgets from "../widgets.json"

const initial_widgets = widgets.categories;

const widgetReducer = (state = initial_widgets, action) => {
    switch (action.type) {

        case "add": {
            const { cat_index, name, text } = action.payload;
            return state.map((category, index) => {
                if(index === cat_index) {
                    return {
                        ...category,
                        widgets: [
                            ...category.widgets,
                            {
                                name,
                                text
                            }
                        ]
                    };
                }

                // Return unchanged category
                return category;
            });
        }

        case "remove": {
            const { cat_index, wid_index } = action.payload;
            return state.map((category, index) => {
                if(index === cat_index) {
                    return {
                        ...category,
                        widgets: category.widgets.filter((widget, i) => i != wid_index)
                    }
                }

                return category;
            });
        }


        case "add_category": {
            return [
                ...state,
                action.payload
            ]
        }
        default: return state;
    }
}

export default widgetReducer;