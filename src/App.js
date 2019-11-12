import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Employees from './components/Employees';
import Employee from './components/Employee';
import axios from 'axios';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      search: '',
      loading: true
    };
    this.sortByAge = this.sortByAge.bind(this);
  }

  

  componentDidMount() {
    axios.get(`https://randomuser.me/api/?page=3&results=100&seed=abc`)
      .then(res => {
        console.log(res.data);
        const employees = [res.data.results];
        this.setState( {
          employees: res.data.results,
          loading: false,
          ascending: false
        } );
        console.log(employees);
      })
  }

  sortByAge(){
    this.setState(prevState => ({
      ascending: !prevState.ascending
    }));
    let temp = this.state.ascending
    const byAge = this.state.employees.sort(function(a, b) {
      return temp ? b.dob.age - a.dob.age : a.dob.age - b.dob.age;
    });
    this.setState({ filteredEmployees: byAge });
  }

  searchFilter(event){
    this.setState({search: event.target.value.substr(0,20)});
  }
  
  render(){

    let filteredEmployees = this.state.employees.filter((employee)=> {
        return employee.name.first.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });

    return (
      <Router>
        <div className="container-fluid">
        <Switch>
            <Route path="/employee" component={Employee}>
    
            </Route>
            <Route path="/">
              <header className="searchbar-header">
                <label><h5>Search for employee</h5></label>
                  <input className="form-control mr-sm-2" onChange={this.searchFilter.bind(this)} value={this.state.search} type="search" placeholder="Type here to search" aria-label="Type here to search" />
              </header>
              <div className="sorting-employees mb-3">
                <h5>Sort employees by:</h5>
                <button type="button" className="btn btn-outline-light btn-sm" onClick={this.sortByAge}> Age <i className="fas fa-sort"></i></button>
              </div>
              <div className="container-fluid employee-container">
              {this.state.loading ? (
                  <div className="row loading-spinner">
                    <div className="col text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                  ) : (
                    <Employees employees={filteredEmployees}/>
                  )
                  }
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}
}

export default App;
