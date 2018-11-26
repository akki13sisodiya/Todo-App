import React from 'react';
import todoState from '../constants/initialState';
import TodoCard from '../components/TodoCard';
import AddNewTask from "../components/AddNewTask";
import uuid from 'uuid/v4';
import {getData, isValidAndNonEmptyObject, persistData} from "../constants/commonUtils";
import {localKeys} from "../constants/constants";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        let todo = getData(localKeys.TODO_KEY);
        if (!isValidAndNonEmptyObject(todo)) {
            todo = todoState;
        }
        this.state = {
            todo,
            isAddNewClicked: false,
            taskName: '',
        };
    }

    handleToggleTask = (event, id) => {
        const todo = { ...this.state.todo };
        const { tasks } = todo;
        const task = tasks.find(t => t.id === id);
        task.isCompleted = event.target.checked;
        if (event.target.checked) {
            todo.completedTasks += 1;
        } else {
            todo.completedTasks -= 1;
        }
        todo.tasks = tasks;
        this.setState({ todo });
        persistData(localKeys.TODO_KEY, todo);
    };

    handleAdd = (newAddedTask) => {
        this.setState({
            isAddNewClicked: true,
        });
    };

    handleCancel = () => {
        this.setState({
            isAddNewClicked: false,
        });
    };

    handleChange = (event) => {
        console.log('dskcjdjvcbdfjv', event.target.value);
        this.setState({
            taskName: event.target.value,
        });
    };

    handleSave = (value, date) => {
        const todo = { ...this.state.todo };
        const tasks = [ ...todo.tasks ];
        tasks.push({
            id: uuid(),
            desc: value,
            date: date.getTime(),
            isCompleted: false,
        });
        todo.tasks = tasks;
        this.setState({
            todo,
            isAddNewClicked: false,
        });
        persistData(localKeys.TODO_KEY, todo);
    };

    handleDeleteTask = (idToRemove) => {
        const todo = { ...this.state.todo };
        let tasks = [ ...todo.tasks ];
        const deletedTask = tasks.find((item) => item.id === idToRemove);
        if (deletedTask.isCompleted) {
            todo.completedTasks = todo.completedTasks - 1;
        }
        todo.tasks = tasks.filter((item) => item.id !== idToRemove);
        this.setState({ todo });
        persistData(localKeys.TODO_KEY, todo);
    };

    render() {
        const { isAddNewClicked, taskName } = this.state;
        console.log('sadfsdfsdfsdf', this.state.todo);
        return (
            <React.Fragment>
                <div className="center-screen" key="handle-todo">
                    <TodoCard
                        handleToggleTask={this.handleToggleTask}
                        todo={{ ...this.state.todo }}
                        handleAdd={this.handleAdd}
                        isAddNewClicked={isAddNewClicked}
                        taskName={taskName}
                        handleChange={this.handleChange}
                        handleDeleteTask={this.handleDeleteTask}
                    />
                </div>
                {
                    isAddNewClicked &&
                    <AddNewTask
                        taskName={taskName}
                        onCancel={this.handleCancel}
                        onSave={this.handleSave}
                    />

                }
            </React.Fragment>
        )
    }
}

export default Todo;