const initialTable = [
    {
            serviceScore: 0,
            serviceLose: 0,
            thirdStrokeScore: 0,
            thirdStrokeLose: 0,
            serviceReceptionScore: 0,
            serviceReceptionLose: 0,
            forthStrokeScore: 0,
            forthStrokeLose: 0,
            fifthStrokeLaterScore: 0,
            fifthStrokeLaterLose: 0,
            operations: [],
        },

]



const initialState = {
    tableData:initialTable,
    metaData:{
    },
    gameVisible: 0,
    status: "SETTING_UP"
};

const annotatingSingleTable1 = (state = initialState , action) => {
  switch (action.type) {
      // mutate table
      case "MUTATE_SINGLE_TABLE_ONE":
        return {
            ...state,
            tableData:state.tableData.map((item, index)=>{
                        return index == action.game? {
                            ...item,
                            [action.key]: action.value,
                            operations:
                                [
                                    ...state.tableData[index],
                                    {
                                        key: action.key,
                                        oldValue: state.tableData[index][action.key],
                                    }
                                ]
                        }: item;
                    }),
        };

      //  Init the table and set relevant states
      case "INIT_TABLE_ONE":
          return initialTable;


      //    Reducer: revert the table operation
      case "REVERT_SINGLE_ONE":
          let op = state.tableData[action.game].operations.pop();
          if(!op){
              return state;
          }
          return {
              ...state,
              tableData:state.tableData.map((item, index)=>{
                        return index == action.game? {
                            ...item,
                            [op.key]: op.oldValue,
                            operations: state.tableData[index].operations,
                        }: item;
                    }),
          };
      case "SWITCH_SINGLE":
        return {
            ...state,
            gameVisible: action.game,
        }


      default:
          return state


  }

};

export default annotatingSingleTable1;

