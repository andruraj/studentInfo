import axios from "axios";

export const addStudent = student => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/students", student)
    .then(res =>
      dispatch({
        type: "ADD_STUDENT",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
export const deleteStudent = id => dispatch => {
  axios
    .delete(`/api/students/${id}`)
    .then(res =>
      dispatch({
        type: "DELETE_STUDENT",
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const getStudents = () => dispatch => {
  axios
    .get("/api/students")
    .then(res =>
      dispatch({
        type: "GET_STUDENTS",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_STUDENTS",
        payload: null
      })
    );
};
export const getStudent = id => dispatch => {
  axios
    .get(`/api/students/${id}`)
    .then(res =>
      dispatch({
        type: "GET_STUDENT",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_STUDENT",
        payload: null
      })
    );
};

export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS"
  };
};
