import React from 'react';
import './App.css';
import { Switch, Route, Router } from 'react-router-dom';
import { history } from './helpers/HistoryHelper'
import { CountryCreate } from './components/country/CountryCreate';
import { Country } from './components/country/Country';
import { Login } from './components/login';
import { Employee } from './components/employee/Employee';
import { EmployeeCreate } from './components/employee/EmployeeCreate';
import Home from './components/Home';
import NotFound from './components/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import ErrorBoundary from './components/Error';
import Notifier from './components/Notifier';
import StateComponent from './components/state/StateComponent'

function App() {
  return (
    <div className="App">
    <ErrorBoundary>    
      <Router history={history}>
        <Switch>
              <PrivateRoute exact path='/add-country' component={ CountryCreate } />
              <PrivateRoute exact path='/edit-country/:id' component={ CountryCreate } />
              <PrivateRoute exact path='/country' component={ Country } />
              <PrivateRoute exact path='/home' component={ Home } />
              <PrivateRoute exact path='/add-employee' component={ EmployeeCreate } />
              <PrivateRoute exact path='/edit-employee/:id' component={ EmployeeCreate } />
              <PrivateRoute exact path='/employee' component={ Employee } />
              <PrivateRoute exact path='/state' component={StateComponent} />
              <Route exact path='/' component={ Login } />
              <Route path='*' component={ NotFound } />
        </Switch>
      </Router>
      </ErrorBoundary>
      <Notifier />
    </div>
  );
}

export default App;