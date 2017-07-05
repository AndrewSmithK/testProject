import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory} from "react-router";
import RegistrationForm from './components/RegistrationForm';
import UserForm from './components/UserForm';
import TodoApp from './components/ToDoApp';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={UserForm}/>
        <Route path="register" component={RegistrationForm}/>
        <Route path="todolist" component={TodoApp}/>
    </Router>
    , app
);