import React from 'react';
import { Link } from 'react-router';

class TodoHeader extends React.Component {
    render () {
        return (
            <div className="header1">
                <Link to="/">
                    <button className="button1">Logout</button>
                </Link>
                <div className="logo1">
                    Todo App
                </div>
            </div>
        );
    }
}

var todoItems = [];

// To Do List
class TodoList extends React.Component {
    render () {
        var items = this.props.items.map((item, index) => {
            return (
                <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            );
        });
        return (
            <ul className="list-group"> {items} </ul>
        );
    }
}

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    onClickClose() {
        var index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    onClickDone() {
        var index = parseInt(this.props.index);
        this.props.markTodoDone(index);

    }
    render () {
        var todoClass = this.props.item.done ?
            "done" : "undone";
        return(
            <div>
                <button type="button" className="deletebutton1" onClick={this.onClickClose}>Delete</button>
                <div className={todoClass} >
                    <input id="checkbox1" ref="checkbox" type="checkbox" onClick={this.onClickDone} checked={false}/>
                    {this.props.item.value}
                </div>
            </div>
        );
    }
}


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        var newItemValue = this.refs.itemName.value;

        if(newItemValue) {
            this.props.addItem({newItemValue});
            this.refs.form.reset();
        }
    }
    render () {
        return (
            <div className="content">
                <form className="form1" ref="form" onSubmit={this.onSubmit}>
                    <input id="forma" ref="itemName" type="text" placeholder="What needs to be done?" required/>
                    <button className="addbutton1" type="submit" value='Add'>Add Todo</button>
                </form>
            </div>
        );
    }
}

 export default class TodoApp extends React.Component {
    constructor (props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        this.state = {todoItems: todoItems};
    }
    addItem(todoItem) {
        todoItems.push({
            index: todoItems.length+1,
            value: todoItem.newItemValue,
            done: false
        });
        this.setState({todoItems: todoItems});
    }
    removeItem (itemIndex) {
        todoItems.splice(itemIndex, 1);
        this.setState({todoItems: todoItems});
    }
    markTodoDone(itemIndex) {
        var todo = todoItems[itemIndex];
        todoItems.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
        this.setState({todoItems: todoItems});
    }
    render() {
        return (
            <div id="main">
                <TodoHeader />
                <TodoForm addItem={this.addItem} />
                <TodoList items={todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
            </div>
        );
    }
}