const initialState = {
    metaData:{
    },
    status: "SETTING_UP"
};

const annotatingMeta = (state = initialState , action) => {
  switch (action.type) {

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

export default annotatingMeta;

