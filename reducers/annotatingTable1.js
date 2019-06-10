const initialTable = {
    tableData:
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
        },
    metaData:{
    },
    status: "SETTING_UP"
};

const annotatingTable1 = (state = initialTable , action) => {
  switch (action.type) {
      // mutate table
      case "MUTATE_TABLE_ONE":
        return {
            ...state,
            tableData:
                {
                    ...state.tableData,
                    [action.key]: state.tableData[action.key] + 1,
                }
        };

      //  Init the table and set relevant states
      case "INIT_TABLE_ONE":
          return initialTable;
      case "SET_UP_TABLE":
          return {
              ...state,
              status: "ANNOTATING",
          };

      case "BACK_TO_SETTING_UP":
          return {
              ...state,
              status: "SETTING_UP"
          };
      case "SET_META_DATA_ITEM":
          return {
              ...state,
              metaData:{
                  ...state.metaData,
                  ...action.item,
              },
          };
      default:
          return state


  }

};

export default annotatingTable1;

