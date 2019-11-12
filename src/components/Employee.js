import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
export class Employee extends Component{

  constructor(props) {
    super(props);
    this.state = {
      employee: {},
      loading: true
    }
  }

  componentDidMount() {
    const { employeeData }  = this.props.location.state;
    console.log('employee = ',employeeData);
    this.setState({
      employee: employeeData,
      loading: false
    },() => { 
      console.log(this.state.employee);
    });
    
  }

  render() {
      return (
          <div className="employee-single container-fluid mt-3">
            {this.state.loading ? (
              <React.Fragment>
                <div className="row loading-spinner">
                  <div className="col text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
              ) : (
              <div className="single-employee row">
                <div className="col-xs-12 col-md-4 col-lg-4">
                  <img src={this.state.employee.picture.large} alt={this.state.employee.name.first} />
                </div>
                <div className="col-xs-12 col-md-8 col-lg-8">
                  <h1>{this.state.employee.name.title}. {this.state.employee.name.first} {this.state.employee.name.last}</h1>
                  <hr/>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <h4>Contact info</h4>
                      <p><i className="far fa-envelope"></i>  {this.state.employee.email}</p>
                      <p><i className="fas fa-phone"></i>  {this.state.employee.phone}</p>
                      <p><i className="fas fa-mobile-alt"></i>  {this.state.employee.cell}</p>
                      
                      <h5 className="mt-3">Full adress:</h5>
                      <p>{this.state.employee.name.title}. {this.state.employee.name.first} {this.state.employee.name.last}</p>
                      <p>{this.state.employee.location.street.name} {this.state.employee.location.street.number}</p>
                      <p>{this.state.employee.location.postcode} {this.state.employee.location.city}</p>
                      <p>{this.state.employee.location.country}</p>
                      
                    </div>
                    <div className="col-xs-12 col-sm-6">
                    <h4>Personal info</h4>
                      <p>Age: {this.state.employee.dob.age}</p>
                      <p>Username: {this.state.employee.login.username}</p>
                    </div>
                  </div>
                  
                  
                </div>
                <div className="container text-center">
                <Link to='/'>
                  <button type="button" className="btn btn-outline-dark btn-sm" style={{'marginTop':'40px'}}><i className="fas fa-chevron-left" style={{'marginRight': '10px'}}></i> Back to listview</button></Link>
                </div>
              </div>  
              )
            }
          </div>
      );
    }
}

export default Employee;
