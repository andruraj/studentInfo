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

class Tabling extends Component {
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
    disabled: true,
    columnDefs: [
      {
        headerName: "Email",
        field: "email",
        sortable: true,
        editable: true
      },
      {
        headerName: "First Name",
        field: "firstname",
        sortable: true,
        editable: true
      },
      {
        headerName: "Last Name",
        field: "lastname",
        sortable: true,
        editable: true
      },
      {
        headerName: "Mobile Number",
        field: "mobile",
        sortable: true,
        editable: true
      },
      {
        headerName: "Edit",
        field: "edit"
      },
      {
        headerName: "Delete",
        field: "delete"
      }
    ]
  };
  componentDidMount() {
    this.props.getStudents();
  }
  static getDerivedStateFromProps(props, state) {
    return { rowData: props.student.students };
  }
  handleClick = (e, i, email) => {
    e.preventDefault();
    if (this.state.disabled) {
      this.setState({ disabled: false, emailEdit: email });
    } else {
      const Stud = {
        email: this.state.emailEdit,
        firstname: this.state.firstnameEdit,
        lastname: this.state.lastnameEdit,
        mobile: this.state.mobileEdit
      };
      this.props.addStudent(Stud);
      this.setState({ disabled: true });
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
  getContextMenuItems = params => {
    const fileActions = [
      {
        name: "Delete Student Entry",
        action: () => this.props.deleteStudent(params.node.data.id)
      }
    ];

    return (params.node.group = fileActions);
  };
  render() {
    return (
      <div className="container">
        <div className="ag-theme-balham">
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            domLayout="autoHeight"
            deltaRowDataMode={true}
            getRowNodeId={data => data.id}
            onFirstDataRendered={params => params.api.sizeColumnsToFit()}
            getContextMenuItems={this.getContextMenuItems}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}

Tabling.propTpes = {
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
)(Tabling);
