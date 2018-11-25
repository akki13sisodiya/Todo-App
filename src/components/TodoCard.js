import React from 'react';
import { Well, Button } from 'react-bootstrap';
import deepEqual from 'deep-equal';
import PropTypes from 'prop-types';

import SingleTask from './SingleTask';
import {sortData} from "../constants/commonUtils";

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
        const { handleToggleTask } = this.props;
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
                </div>
                <hr style={{ borderBottom: '2px solid #ddd' }} />
                {
                    tasks.map((task, index) => (
                        <React.Fragment>
                            {
                                ((showIncomplete && (!task.isCompleted)) ||
                                (!showIncomplete)) &&
                                <SingleTask
                                    key={`${task.id}-${index}-todo-task`}
                                    task={task}
                                    handleToggleTask={handleToggleTask}
                                />
                            }
                        </React.Fragment>
                    ))
                }
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
};

TodoCard.defaultProps = {
    handleToggleTask: () => {},
    todo: {},
};

export default TodoCard;