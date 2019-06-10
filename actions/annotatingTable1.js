export function initTableOne() {
    return {
        type: "INIT_TABLE_ONE"
    }
}

export const addOneInTable1 = (key) => ({
    type: "MUTATE_TABLE_ONE",
    key:key,
});

export const setUpTable = (settings) => ({
    type: "SET_UP_TABLE",
    settings,
});

export const backToSettingUp = ()=>({
   type: "BACK_TO_SETTING_UP"
});