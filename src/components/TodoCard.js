import React from 'react';
import { Well, Button } from 'react-bootstrap';
import deepEqual from 'deep-equal';
import PropTypes from 'prop-types';

import SingleTask from './SingleTask';
import {sortData} from '../constants/commonUtils';

class TodoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIncomplete: false,
            todoData: Object.assign({}, props.todo) || {},
            isSortClicked: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('asdfsdff', !deepEqual(nextProps.todo, this.props.todo));
        if (!deepEqual(nextProps.todo, this.props.todo)) {
            const { isSortClicked } = this.state;
            const todo = Object.assign({}, nextProps.todo);
            if (isSortClicked) {
                todo.tasks = sortData(todo.tasks, 'date');
            }
            this.setState({ todoData: todo });
        }
    }

    handleIncompleteButton = () => {
        this.setState(state => ({
            showIncomplete: !state.showIncomplete,
        }));
    };

    handleSort = () => {
        const { todoData, isSortClicked } = this.state;
        const { tasks } = todoData;
        let sortedData = this.props.todo.tasks;
        if ( !isSortClicked ) {
            sortedData = sortData(tasks,'date', true);
        }
        todoData.tasks = sortedData;
        this.setState({
            todoData,
            isSortClicked: !isSortClicked,
        })
    };

    render() {
        const { handleToggleTask, handleAdd, handleDeleteTask } = this.props;
        const { showIncomplete, todoData } = this.state;
        const { tasks } = todoData;
        let length = tasks.length;
        if (showIncomplete) {
            length = tasks.length - todoData.completedTasks;
        }
        return (
            <Well className="todo-container">
                <div className="todo-header">{length}&nbsp;Tasks</div>
                <div className="todo-button-group">
                    <Button bsStyle="primary" onClick={this.handleIncompleteButton}>
                        {
                            !showIncomplete ?
                                <span>Show Incomplete Todos</span>
                                :<span>Show All Todos</span>
                        }
                    </Button>
                    <Button bsStyle="success" onClick={this.handleSort}>Sort Todos</Button>
                    <Button bsStyle="primary" onClick={handleAdd}>Add New Task</Button>
                </div>
                <hr style={{ borderBottom: '2px solid #ddd', margin: '0' }} />
                <div style={{ maxHeight: '20rem', overflow: 'auto' }}>
                {
                    tasks.map((task, index) => (
                        <React.Fragment  key={`${task.id}-${index}-todo-task`}>
                            {
                                ((showIncomplete && (!task.isCompleted)) ||
                                (!showIncomplete)) &&
                                <SingleTask
                                    task={task}
                                    handleToggleTask={handleToggleTask}
                                    handleDeleteTask={handleDeleteTask}
                                />
                            }
                        </React.Fragment>
                    ))
                }
                </div>
                {
                    (length === 0) &&
                    <div className="empty-message">No Tasks Remaining !!!</div>
                }
            </Well>
        );
    }
}

TodoCard.propTypes = {
    handleToggleTask: PropTypes.func,
    todo: PropTypes.object,
    handleAdd: PropTypes.func,
    isAddNewClicked: PropTypes.bool,
    handleChange: PropTypes.func,
    handleDeleteTask: PropTypes.func,
    taskName: PropTypes.string,
};

TodoCard.defaultProps = {
    handleToggleTask: () => {},
    todo: {},
    handleAdd: {},
    isAddNewClicked: false,
    taskName: '',
    handleChange: () => {},
    handleDeleteTask: () => {},
};

export default TodoCard;