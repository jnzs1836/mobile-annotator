const sampleList = {
    list: [
        {
            name: "北京--2018--运动员A 3:0 运动员B",
            date: "06/07/2018",
            place:"北京",
        },
        {
            name: "广州--2018--运动员A 3:0 运动员B",
            date: "03/07/2018",
            place:"广州",
        },
        {
            name: "上海--2018--运动员A 3:0 运动员B",
            date: "09/07/2018",
            place:"上海",
        }
    ]
}

const defaultState = sampleList

const annotationList = (state = defaultState, action) => {
  switch (action.type) {
      // mutate table
      case "REMOVE_ONE":
        return {
            ...state,
        };
      case "UPDATE_LIST":
          return {
              ...state,
              list: action.list,
          };
      default:
          return state
  }

};

export default annotationList;


sampleState = {
    list:[],
}