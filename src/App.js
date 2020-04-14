import React, { Component } from 'react';
import './App.css';

class App extends Component{
  constructor() {
		super();

		this.state = {
      toDoList: [],
      taskID: 0,
      task: "",
      dueDate: "",
    };
    
    
  }

  render(){
    return (
      <div className="App pt-5">
          <h1 className="d-flex justify-content-center">Todo List</h1>

          <div className="my-5 d-flex justify-content-center">
            <input className="taskSetter" type="text" placeholder="Add task here..."/>
            <input type="date" />
            <button className="btn btn-primary ml-3">Add!</button>
          </div>
      </div>
    );
  }
}

export default App;
