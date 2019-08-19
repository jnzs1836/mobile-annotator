const user = (state = [], action) => {
  switch (action.type) {
      case "REMOVE_ONE":
        return {
            ...state,
        };
      default:
          return state
  }

};




export default user;


sampleState = {
    name: "sample",
    credential: "sample"
}
