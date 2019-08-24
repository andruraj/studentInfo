import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addStudent,
  deleteStudent,
  getStudent,
  getStudents
} from "../actions/studentActions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class Landing extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    errors: {},
    firstnameEdit: "",
    lastnameEdit: "",
    emailEdit: "",
    mobileEdit: "",
    disabled: "",
    rowData: ""
  };
  componentDidMount() {
    this.props.getStudents();
  }
  static getDerivedStateFromProps(props, state) {
    return { rowData: props.student.students, errors: props.errors };
  }
  handleClick = (e, i, stud) => {
    e.preventDefault();
    if (this.state.disabled === "" || undefined) {
      this.setState({
        disabled: i,
        emailEdit: stud.email,
        firstnameEdit: stud.firstname,
        lastnameEdit: stud.lastname,
        mobileEdit: stud.mobile
      });
    } else {
      const Stud = {
        email: this.state.emailEdit,
        firstname: this.state.firstnameEdit,
        lastname: this.state.lastnameEdit,
        mobile: this.state.mobileEdit
      };
      this.props.addStudent(Stud);
      this.setState({
        disabled: "",
        emailEdit: "",
        firstnameEdit: "",
        lastnameEdit: "",
        mobileEdit: ""
      });
      window.location.reload();
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  addStudent = e => {
    e.preventDefault();
    const newStud = {
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      mobile: this.state.mobile
    };
    this.props.addStudent(newStud);
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      mobile: ""
    });
  };
  delete = id => {
    this.props.deleteStudent(id);
  };
  handleEdit = e => {
    this.setState({});
  };
  render() {
    const tbl = this.state.rowData
      ? this.state.rowData.map((stud, index) => (
          <tr key={stud._id}>
            <td>{stud.email}</td>
            <td>
              {this.state.disabled !== index ? (
                stud.firstname
              ) : (
                <input
                  type="text"
                  name="firstnameEdit"
                  onChange={this.handleChange}
                  value={this.state.firstnameEdit}
                />
              )}
            </td>
            <td>
              {this.state.disabled !== index ? (
                stud.lastname
              ) : (
                <input
                  type="text"
                  name="lastnameEdit"
                  onChange={this.handleChange}
                  value={this.state.lastnameEdit}
                />
              )}
            </td>
            <td>
              {this.state.disabled !== index ? (
                stud.mobile
              ) : (
                <input
                  type="text"
                  name="mobileEdit"
                  onChange={this.handleChange}
                  value={this.state.mobileEdit}
                />
              )}
            </td>
            <td>
              <button
                style={{
                  border: "none",
                  background: "rgb(255, 255, 255, 0)"
                }}
                onClick={e => this.handleClick(e, index, stud)}
              >
                <i
                  className="fa fa-pencil-alt text-secondary"
                  aria-hidden="true"
                />
              </button>
            </td>
            <td>
              <button
                style={{
                  border: "none",
                  background: "rgb(255, 255, 255, 0)"
                }}
                onClick={() => this.delete(stud._id)}
              >
                <i className="fa fa-trash text-danger" aria-hidden="true" />
              </button>
            </td>
          </tr>
        ))
      : null;

    return (
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  style={{
                    border: "none",
                    background: "rgb(255, 255, 255, 0)"
                  }}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </td>
              <td>
                <input
                  style={{
                    border: "none",
                    background: "rgb(255, 255, 255, 0)"
                  }}
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={this.state.firstname}
                />
              </td>
              <td>
                <input
                  style={{
                    border: "none",
                    background: "rgb(255, 255, 255, 0)"
                  }}
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  value={this.state.lastname}
                />
              </td>
              <td>
                <input
                  style={{
                    border: "none",
                    background: "rgb(255, 255, 255, 0)"
                  }}
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  onChange={this.handleChange}
                  value={this.state.mobile}
                />
              </td>
              <td colSpan="2">
                <button className="btn btn-success" onClick={this.addStudent}>
                  Add Student
                </button>
              </td>
            </tr>
            {tbl}
          </tbody>
        </table>
        {this.state.errors && (
          <p className="text-danger">{this.state.errors.email}</p>
        )}
      </div>
    );
  }
}

Landing.propTpes = {
  student: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student
});

// const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  {
    addStudent,
    deleteStudent,
    getStudent,
    getStudents
  }
)(Landing);
