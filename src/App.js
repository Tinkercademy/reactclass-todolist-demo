import React, { Component } from 'react';
import './App.css';
import Edit from './Edit';

class App extends Component{
  constructor() {
		super();

		this.state = {
      toDoList: [],
      pinnedTasks: [],
      taskID: 0,
      task: "",
      dueDate: "",
      editing: false,
      taskToEdit: [],
    };
    
    this.handleTask = this.handleTask.bind(this);
    this.handleDueDate = this.handleDueDate.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.pinTask = this.pinTask.bind(this);
    this.unpinTask = this.unpinTask.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.editTask = this.editTask.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
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
      toDoList: [...this.state.toDoList, {ID: this.state.taskID, description: this.state.task, date: this.state.dueDate, subTasks: [], pinned: false}]
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

  pinTask(taskToPin){
    this.state.toDoList.forEach(task =>{
      if(task.ID === taskToPin.ID){
        task.pinned = true
        this.setState({
          toDoList: this.state.toDoList
        }, () => {
          console.log(this.state.toDoList)
        })
      }
    })
  }

  unpinTask(taskToUnpin){
    this.state.toDoList.forEach(task =>{
      if(task.ID === taskToUnpin.ID){
        task.pinned = false
        this.setState({
          toDoList: this.state.toDoList
        })
      }
    })
  }

  openEditor(task){
    this.setState({
      editing: !this.state.editing,
      taskToEdit: task
    })
  }

  closeEditor(){
    this.setState({
      editing: !this.state.editing
    })
  }

  editTask(ID, description, dueDate){
    this.state.toDoList.forEach(task =>{
      if(task.ID === ID){
        task.description = description
        task.date = dueDate
        this.setState({
          toDoList: this.state.toDoList,
          editing: !this.state.editing
        })
      }
    })
  }

  addSubTask(ID, subtask){
    this.state.toDoList.forEach(task =>{
      if(task.ID === ID){
        task.subTasks = [...task.subTasks, subtask]
        this.setState({
          toDoList: this.state.toDoList,
        }, () => {
          console.log(this.state.toDoList)
        })
      }
    })
  }

  renderToDo(){
    return this.state.toDoList.map(task => {
      if(!task.pinned){
        return(
          <div className="container task mb-2 p-2" key={task.ID}>
              <div className="row">
                <div className="col-8">
                    <div className="dueDate pb-1">Due: {task.date}</div>
                    <span>{task.description}</span>
                </div>
                <div className="col-4 pt-2 pl-5">
                  <button className="btn btn-success mx-2" onClick = {() => this.openEditor(task)}>Edit</button>
                  <button className="btn btn-warning mr-2" onClick = {() => this.pinTask(task)}>Pin</button>
                  <button className="btn btn-danger" onClick = {() => this.deleteTask(task)}>X</button>
                </div>
              </div>
            </div>
        );
      }
    })
  }

  renderPinnedTasks(){
    return this.state.toDoList.map(task => {
      if(task.pinned){
        return(
          <div className="container-fluid task mb-2 p-2" key={task.ID}>
            <div className="row">
              <div className="col-8">
                  <div className="dueDate pb-1"><span>Due: {task.date}</span> <span>Pinned</span></div>
                  <span>{task.description}</span>
              </div>
              <div className="col-4 pt-2 pl-5">
                <button className="btn btn-success mx-2" onClick = {() => this.openEditor(task)}>Edit</button>
                <button className="btn btn-warning mr-2" onClick = {() => this.unpinTask(task)}>Unpin</button>
                <button className="btn btn-danger" onClick = {() => this.deleteTask(task)}>X</button>
              </div>
            </div>
          </div>
        );
      }
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
              <div className="col-2"></div>
              <div className="col-8">
                {this.renderPinnedTasks() }                
                {this.renderToDo() }              
              </div>
              <div className="col-2"></div>
            </div>
          </div>

          {this.state.editing ?  
            <Edit
                editTask = {this.editTask}
                closePopup = {this.closeEditor}
                taskToEdit = {this.state.taskToEdit}
                addSubTask = {this.addSubTask}
            />  
            : null  
          }
      </div>
    );
  }
}

export default App;