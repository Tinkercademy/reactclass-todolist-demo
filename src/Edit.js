import React, { Component } from 'react';
import './App.css';

class Edit extends Component{
    constructor(props) {
		super(props);

		this.state = {
            task: this.props.taskToEdit.description,
            dueDate: this.props.taskToEdit.date,
            subTask: "",
            addingSubTask: false,
        };
    
    this.handleTask = this.handleTask.bind(this);
    this.handleDueDate = this.handleDueDate.bind(this);
    this.handleSubTask = this.handleSubTask.bind(this);
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

    handleSubTask(e){
        this.setState({
            subTask: e.target.value
        })
    }

    addSubTask(){
        this.setState({
            addingSubTask: !this.state.addingSubTask
        })
    }

    renderSubTasks(){
        return this.props.taskToEdit.subTasks.map(subtask => {
            return(
                <div>
                    <label className="cbLabel"><input className="cb" type="checkbox"/>{subtask}</label>
                </div>
            );
        })
    }

    render(){
        let subtasks
        let button
        if(this.state.addingSubTask){
            subtasks = 
            <div>
                {this.renderSubTasks() }
                <input type="text" onChange={this.handleSubTask}/>
                <button className="btn btn-success ml-3" onClick={() => this.props.addSubTask(this.props.taskToEdit.ID, this.state.subTask)}>+</button>
                <button className="btn btn-warning ml-3" onClick={() => this.addSubTask()}>X</button>
            </div>
        }else{
            button = <button className="btn btn-success ml-3" onClick={() => this.addSubTask()}>+</button>
            subtasks = 
            <div>
                {this.renderSubTasks() }
            </div>
        }
        return (
            <div className='popup'>  
                <div className='popupinner pl-4 pt-3'>
                    <button className="closepopup" onClick={() => this.props.editTask(this.props.taskToEdit.ID, this.state.task, this.state.dueDate)}>X</button>
                    <div className="mt-3">
                        <h3>Description</h3>
                        <input type="text" onChange={this.handleTask} defaultValue={this.props.taskToEdit.description} />
                        <h3>Due Date</h3>
                        <input type="date" defaultValue={this.props.taskToEdit.date} onChange={this.handleDueDate}/>
                        <div className="d-flex mt-2">
                            <h3>Subtasks</h3>
                            {button}
                        </div>
                        {subtasks}
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;