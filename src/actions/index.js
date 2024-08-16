export const add_widget = (new_widget) => {
    return {
        type: "add",
        payload: new_widget
    }
}

export const remove_widget = (removed_widget) => {
    return {
        type: "remove",
        payload: removed_widget
    }
}

export const add_category = (new_category) => {
    return {
        type: "add_category",
        payload: new_category
    }
}