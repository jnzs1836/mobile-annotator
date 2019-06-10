export function initTableOne() {
    return {
        type: "INIT_TABLE_ONE"
    }
}

export const addOneInTable1 = (key) => ({
    type: "MUTATE_TABLE_ONE",
    key:key,
});

