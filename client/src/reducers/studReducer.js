const initState = {
  students: [],
  student: [],
  loading: false
};

const studentReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_STUDENT":
      return {
        ...state,
        students: [action.payload, ...state.students],
        loading: true
      };
    case "GET_STUDENTS":
      return {
        ...state,
        students: action.payload,
        loading: false
      };
    case "GET_STUDENT":
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter(
          student => student._id !== action.payload
        ),
        loading: false
      };
    default:
      return state;
  }
};

export default studentReducer;
