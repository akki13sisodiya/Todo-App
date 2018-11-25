import React from 'react';
import { Well, Button } from 'react-bootstrap';
import deepEqual from 'deep-equal';

import SingleTask from './SingleTask';
import {sortData} from "../constants/commonUtils";

class TodoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIncomplete: false,
            todoData: Object.assign({}, props.todo) || {},
            isSorted: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!deepEqual(nextProps.todo, this.props.todo)) {
            this.setState({ todoData: nextProps.todo });
        }
    }

    handleIncompleteButton = () => {
        this.setState(state => ({
            showIncomplete: !state.showIncomplete,
        }));
    };

    handleSort = () => {
        const { todoData, isSorted } = this.state;
        const { tasks } = todoData;
        console.log('dskcjndksjvcndfkjvdf', this.props.todo);
        let sortedData = this.props.todo.tasks;
        if ( !isSorted ) {
            sortedData = sortData(tasks,'date', true);
        }
        todoData.tasks = sortedData;
        this.setState({
            todoData,
            isSorted: !isSorted,
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
            <Well style={{ width: '40rem', padding: '0' }}>
                <div style={{ padding: '1rem 2rem 0 2rem', fontSize: '1.5em' }}>{length}&nbsp;Tasks</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem' }}>
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
                        <React.Fragment key={`${task.id}-todo-task`}>
                            {
                                ((showIncomplete && (!task.isCompleted)) ||
                                (!showIncomplete)) &&
                                <SingleTask
                                    key={`${task.id}-todo-task`}
                                    task={task}
                                    index={index}
                                    handleToggleTask={handleToggleTask}
                                />
                            }
                        </React.Fragment>
                    ))
                }
                {
                    (length === 0) &&
                    <div style={{  display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>No Tasks Remaining !!!</div>
                }
            </Well>
        );
    }
}

export default TodoCard;