import React, { Component } from 'react';
export class Employee extends Component{

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  
    componentDidMount() {
    }

    render() {

      // const employee =(props) => {
      //   console.log('kalle',props.location.employeeProps)
      // }
      // console.log(employee);
      
        return (
            <div className="employee-single">
              <div className="row">
                    <div className="col-4">
                      {/* <img src={employee.picture.large} alt={employee.name} /> */}
                    </div>
                    <div className="col-8">
                      <h4>KALLE</h4>
                
                    </div>
                  </div>
            </div>
        );
    }
}

export default Employee;
