import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

export class Employees extends Component{

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (

      <div>
        {
          this.props.employees.map((employee,i) => 
            <div className="employee-list row"  key={i}>
                <div className="col col-xs-12 col-sm-3 col-lg-3 employee-img">
                  <img src={employee.picture.large} alt={employee.name.first} />
                </div>
                <div className="col-xs-12 col-sm-3 col-lg-4 employee-data">
                  <h4>{employee.name.first} {employee.name.last}</h4>
                  <p><i className="fas fa-globe-americas"></i> {employee.location.city} / {employee.location.country}</p>
                  <p>Age: {employee.dob.age}</p>
                </div>
                <div className="col-xs-12 col-sm-3 col-lg-3 employee-data">
                  <p><i className="fas fa-phone"></i> {employee.phone}</p>
                  <p><i className="fas fa-mobile-alt"></i> {employee.cell}</p>
                  <p><i className="far fa-envelope"></i> {employee.email}</p>
                </div>
                <div className="col-xs-12 col-sm-3 col-lg-2 employee-data text-center">
                  <Link to={{
                      pathname: '/employee',
                      state: {
                        employeeData: employee
                      }
                    }}>
                      <button className="btn btn-outline-dark btn-sm" style={{'marginTop':'20px'}}>Show more info <i className="fas fa-chevron-right" style={{'marginLeft': '10px'}}></i></button>
                  </Link>
                </div>
              </div>
          )
        }

      </div>
    );
  }
}

export default Employees;
