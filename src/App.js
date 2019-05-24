import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddToDo from './components/AddToDo'
import About from './components/pages/About'
import axios from 'axios'

import uuid from 'uuid'


class App extends Component {
    state = {
        todos:[]

    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res =>this.setState({todos:res.data}));
    }
    addTodo = (title) =>{
        axios.post('https://jsonplaceholder.typicode.com/todos',{
            title: title,
            completed: false

        }).then(res=> this.setState({todos:[...this.state.todos,res.data]}));
    }
    //Toggle complete
    delTodo =(id) =>{
        axios.delete(`https://jsonplaceholder.typicode.com/todos/$id`).then(res => this.setState({todos:[...this.state.todos.filter(todo => todo.id !== id)]}));

    }
    markComplete = (id)=>{
        this.setState({todos:this.state.todos.map(todo =>{
            if(todo.id === id){
                todo.completed =!todo.completed
            }
            return todo;
        })
        });
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header/>

                        <Route exact path="/" render={props => (
                            <React.Fragment>

                                <AddToDo addTodo={this.addTodo}/>
                                <Todos todos={this.state.todos} markComplete={this.markComplete}
                                       delTodo={this.delTodo}/>

                            </React.Fragment>

                        )}/>


                        <Route path="/about" component={About}/>


                    </div>
                </div>
            </Router>
        );
    }
}
export default App;
