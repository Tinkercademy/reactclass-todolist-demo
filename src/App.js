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
    
    this.handleTask = this.handleTask.bind(this);
    this.handleDueDate = this.handleDueDate.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleTask(e){
    this.setState({
      task: e.target.value
    }, () => {
      console.log(this.state.task)
    })
  }

  handleDueDate(e){
    this.setState({
      dueDate: e.target.value
    }, () => {
      console.log(this.state.dueDate)
    })
  }

  addTask(){
    if(this.state.task !== "" && this.state.dueDate !== "")
    this.setState({
      toDoList: [...this.state.toDoList, {ID: this.state.taskID, description: this.state.task, date: this.state.dueDate}]
    }, () => {
      console.log(this.state.toDoList)
      let newToDoList = this.state.toDoList
      this.setState({
        taskID: this.state.taskID + 1,
        toDoList: newToDoList.sort((a,b) => new Date(a.date) - new Date(b.date))
      })
    })
  }

  render(){
    return (
      <div className="App pt-5">
          <h1 className="d-flex justify-content-center">Todo List</h1>

          <div className="my-5 d-flex justify-content-center">
            <input className="taskSetter" onChange = {this.handleTask} type="text" placeholder="Add task here..."/>
            <input onChange = {this.handleDueDate} type="date" />
            <button className="btn btn-primary ml-3" onClick = {() => this.addTask()}>Add!</button>
          </div>
      </div>
    );
  }
}

export default App;
