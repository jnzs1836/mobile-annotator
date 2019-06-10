const annotationList = (state = [], action) => {
  switch (action.type) {
      // mutate table
      case "REMOVE_ONE":
        return {
            ...state,
        };
      default:
          return state
  }

};

export default annotationList;

