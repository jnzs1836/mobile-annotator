// Operations on Meta Data

// Complete Table Setting Up
export const setUpTable = () => ({
    type: "SET_UP_TABLE",
});


// Back to setting up page
export const backToSettingUp = ()=>({
   type: "BACK_TO_SETTING_UP"
});


// Set an item in Meta Data
export const setMetaDataItem = (item)=>({
    type: "SET_META_DATA_ITEM",
    item: item
});




// Operations on Single Table One


export function initTableOne() {
    return {
        type: "INIT_TABLE_ONE"
    }
}


// Add one to one item in the table
export const addOneInSingleTable1 = (key, value, game) => ({
    type: "MUTATE_SINGLE_TABLE_ONE",
    key:key,
    value: value,
    game: game,
});

export const revertSingleOne = (game) => ({
    type: "REVERT_SINGLE_ONE",
    game: game,
});


export const switchDouble = (game) => ({
    type: "SWITCH_DOUBLE",
    game: game,
})


// Operations on Double Table One

export const addOneInDoubleTable2 = (key, value, game) => ({
    type: "MUTATE_DOUBLE_TABLE_ONE",
    key: key,
    value: value,
    game: game,
});

export const initTableDoubleOne = () => ({
    type: "INIT_DOUBLE_TABLE_ONE",
})

export const revertDoubleOne = (game) => ({
    type: "REVERT_DOUBLE_ONE",
    game: game,

})


export const switchSingle = (game) => ({
    type: "SWITCH_SINGLE",
    game: game,
})