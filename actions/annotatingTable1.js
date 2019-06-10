export function initTableOne() {
    return {
        type: "INIT_TABLE_ONE"
    }
}

export const addOneInTable1 = (key) => ({
    type: "MUTATE_TABLE_ONE",
    key:key,
});

export const setUpTable = () => ({
    type: "SET_UP_TABLE",
});

export const backToSettingUp = ()=>({
   type: "BACK_TO_SETTING_UP"
});

export const setMetaDataItem = (item)=>({
    type: "SET_META_DATA_ITEM",
    item: item
})