import React from 'react';
import { Checkbox } from 'react-bootstrap';
import { getTimeWithAMPM, getDateInMonthDDYYYYFormat } from '../constants/commonUtils';

class SingleTask extends React.Component {

    handleCheckbox = (event) => {
        const { handleToggleTask, task } = this.props;
        handleToggleTask(event, task.id);
    };

    render() {
        const { task } = this.props;
        return (
            <div
                style={{ borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem' }}
            >
                <Checkbox
                    onChange={this.handleCheckbox}
                    checked={task.isCompleted}
                >
                    <span className={task.isCompleted ? 'strike-through' : ''}>{task.desc}</span>
                </Checkbox>
                <div style={{ textAlign: 'right' }}>
                    {getDateInMonthDDYYYYFormat(new Date(task.date))}<br/>
                    <span>{getTimeWithAMPM(new Date(task.date))}</span>
                </div>
            </div>
        );
    }
}

export default SingleTask;