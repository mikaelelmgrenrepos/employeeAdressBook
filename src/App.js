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
      loading: true,
      ageAscending: false,
      nameAscending: true,
      countryAscending: true
    };
    this.sortByAge = this.sortByAge.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByCountry = this.sortByCountry.bind(this);
  }

  componentDidMount() {
    // the API-request (always getting from the same seed and page for testing)
    axios.get(`https://randomuser.me/api/?page=3&results=100&seed=abc`)
      .then(res => {
        console.log(res.data);
        let employees = [res.data.results];
        // console.log('1',employees.sort((a, b) => a.location.country.localeCompare(b.location.country)));
        
        this.setState( {
          employees: res.data.results,
          loading: false
        } );
        console.log(employees);
        
      })

  }

  sortByName(){
    this.setState(prevState => ({
      nameAscending: !prevState.nameAscending
    }));
    let temp = this.state.nameAscending
    const byName = this.state.employees.sort(function(a, b) {
      if(temp){
        if(a.name.first < b.name.first) { return -1; }
        if(a.name.first > b.name.first) { return 1; }
        return 0;
      } else {
        if(a.name.first < b.name.first) { return 1; }
        if(a.name.first > b.name.first) { return -1; }
        return 0;
      }
    });
    this.setState({ filteredEmployees: byName });
  }
  sortByCountry(){
    this.setState(prevState => ({
      countryAscending: !prevState.countryAscending
    }));
    let temp = this.state.countryAscending
    const byCountry = this.state.employees.sort(function(a, b) {
      if(temp){
        if(a.location.country < b.location.country) { return -1; }
        if(a.location.country > b.location.country) { return 1; }
        return 0;
      } else {
        if(a.location.country < b.location.country) { return 1; }
      if(a.location.country > b.location.country) { return -1; }
      return 0;
      }
    });
    this.setState({ filteredEmployees: byCountry });
  }
  

  sortByAge(){ // implementing the sortByAge-function
    this.setState(prevState => ({
      ageAscending: !prevState.ageAscending
    }));
    let temp = this.state.ageAscending
    const byAge = this.state.employees.sort(function(a, b) {
      return temp ? b.dob.age - a.dob.age : a.dob.age - b.dob.age;
    });
    this.setState({ filteredEmployees: byAge });
  }

  searchFilter(event){ // implementing the searchFilter-function
    this.setState({search: event.target.value.substr(0,20)});
  }
  
  render(){
    // converting the API-request-data to filtered results
    let filteredEmployees = this.state.employees.filter((employee)=> {
    
        return employee.name.first.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    console.log(filteredEmployees.length)
    return (
      <Router>
        <div className="container-fluid">
        <Switch>
            <Route path="/employee" component={Employee}>
    
            </Route>
            <Route path="/">
              <header className="searchbar-header">
                <label><h5>Search for employee</h5></label>
                  <input className="form-control mr-sm-2" onChange={this.searchFilter.bind(this)} value={this.state.search} type="search" placeholder="Type here to search by first name" aria-label="Type here to search" />
              </header>
              <div className="sorting-employees mb-3">
                <h5>Sort employees by:</h5>
                <button type="button" className="btn btn-outline-light btn-sm" onClick={this.sortByAge}> Age <i className="fas fa-sort"></i></button>
                <button type="button" className="btn btn-outline-light btn-sm" onClick={this.sortByName}> Name <i className="fas fa-sort"></i></button>
                <button type="button" className="btn btn-outline-light btn-sm" onClick={this.sortByCountry}> Country <i className="fas fa-sort"></i></button>
              </div>
              {filteredEmployees.length ? (
                <h5>We found: {filteredEmployees.length} employees.</h5>
                ) : (
                  <h5>Sorry. The search doesn´t match any criteria.</h5>
                )}
              
              <div className="container-fluid employee-container">
              {this.state.loading ? (
                  // if loading data show a spinner
                  <div className="row loading-spinner"> 
                    <div className="col text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                  ) : (
                    // if loading is complete - show data
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
