const initialTable = {

    // Game index
    // 局数
    id: 0,
    gameVisible: 0,

    //  opening: service to the forth stroke
    //  开局阶段，发球到第四拍

    //  sustained: rally
    //  相持阶段

    // Player A1
    playerA1OpeningScore: 0,
    playerA1OpeningLose: 0,
    playerA1SustainedScore: 0,
    playerA1SustainedLose: 0,

    // Player A2
    playerA2OpeningScore: 0,
    playerA2OpeningLose: 0,
    playerA2SustainedScore: 0,
    playerA2SustainedLose: 0,

    // Player B1
    playerB1OpeningScore: 0,
    playerB1OpeningLose: 0,
    playerB1SustainedScore: 0,
    playerB1SustainedLose: 0,

    // Player B2
    playerB2OpeningScore: 0,
    playerB2OpeningLose: 0,
    playerB2SustainedScore: 0,
    playerB2SustainedLose: 0,


    operations: [],
};
const initialState = {


    tableData:
        [
            initialTable
        ],
    gameVisible: 0,
};

const annotatingDoubleTable1 = (state = initialState, action) => {
    switch (action.type) {
        // mutate table
        case "MUTATE_DOUBLE_TABLE_ONE":
            return {
                ...state,
                tableData: state.tableData.map((item, index) => {
                    return index == action.game ? {
                        ...item,
                        [action.key]: action.value,
                        operations:
                            [
                                ...state.tableData[index].operations,
                                {
                                    key: action.key,
                                    oldValue: state.tableData[action.game][action.key],
                                }
                            ]
                    } : item;
                }),
            };

        //  Init the table and set relevant states
        case "INIT_DOUBLE_TABLE_ONE":
            return {
                ...state,
                tableData:
                    [
                        initialTable,
                    ]
            };
        case "ADD_NEW_GAME":
            return {
                ...state,
                tableData:
                    {
                        ...state.tableData,
                        tableData: [
                            ...state.tableData,
                            initialTable,
                        ]
                    }
            };

        //    Revert the annotating table operation
        case "REVERT_DOUBLE_ONE":
            let op = state.tableData[action.game].operations.pop();
            if(!op){
              return state;
              }
            return {
                ...state,
                tableData: state.tableData.map((item, index) => {
                    return index == action.game ? {
                        ...item,
                        [op.key]: op.oldValue,
                        operations: state.tableData[index].operations,
                    } : item;
                }),
            };

        case "SWITCH_DOUBLE":
            return {
                ...state,
                gameVisible: action.game,
            }

        default:
            return state


    }

};

export default annotatingDoubleTable1;

