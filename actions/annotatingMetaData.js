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