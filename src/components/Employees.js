import React, { Component } from 'react';
import Employee from './Employee';

export class Employees extends Component{

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="">
        {
          this.props.employees.map((employee,i) => 
            <div className="employee-list row"  key={i}>
                <div className="col col-sm-12 col-md-3 col-lg-2 employee-img">
                  <img src={employee.picture.large} alt={employee.name.first} />
                </div>
                <div className="col-sm-12 col-md-5 col-lg-5 employee-data">
                  <h4>{employee.name.first} {employee.name.last}</h4>
                  <p><i className="fas fa-globe-americas"></i> {employee.location.city} / {employee.location.country}</p>
                  <p>Age: {employee.dob.age}</p>
                  
                </div>
                <div className="col-sm-12 col-md-4 col-lg-5 employee-data">
                <p><i className="fas fa-phone"></i> {employee.phone}</p>
                  <p><i className="fas fa-mobile-alt"></i> {employee.cell}</p>
                  <p><i className="far fa-envelope"></i> {employee.email}</p>
                  
                </div>
              </div>
          )
        }

      </div>
    );
  }
}

export default Employees;
