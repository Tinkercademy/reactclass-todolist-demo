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
    this.deleteTask = this.deleteTask.bind(this);
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

  deleteTask(taskToDelete){
    let updatedToDoList = []
    this.state.toDoList.forEach(task =>{
      if(task.ID !== taskToDelete.ID){
        updatedToDoList = [...updatedToDoList, task]
      }
    })
    this.setState({
      toDoList: updatedToDoList
    })
  }

  renderToDo(){
    return this.state.toDoList.map(task => {
      return(
        <div className="container task mb-2 p-2" key={task.ID}>
            <div className="row">
              <div className="col-9">
                  <div className="dueDate pb-1">Due: {task.date}</div>
                  <span>{task.description}</span>
              </div>
              <div className="col-3 pt-2">
                <button className="btn btn-danger" onClick = {() => this.deleteTask(task)}>X</button>
              </div>
            </div>
          </div>
      );
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

          <div className="container">
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                {this.renderToDo() }
              </div>
              <div className="col-3"></div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;