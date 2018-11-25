import React from 'react';
import todoState from '../constants/initialState';
import TodoCard from '../components/TodoCard';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: todoState,
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
    };

    render() {
        return (
            <div className="center-screen" key="handle-todo">
                <TodoCard
                    handleToggleTask={this.handleToggleTask}
                    todo={{ ...this.state.todo }}
                />
            </div>
        )
    }
}

export default Todo;