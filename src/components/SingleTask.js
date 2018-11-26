import React from 'react';
import { Checkbox } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { getTimeWithAMPM, getDateInMonthDDYYYYFormat } from '../constants/commonUtils';

const styles = () => ({
    lightTooltip: {
        background: 'black',
        color: 'white',
        fontSize: '14px',
    },
});

class SingleTask extends React.Component {

    handleCheckbox = (event) => {
        const { handleToggleTask, task } = this.props;
        handleToggleTask(event, task.id);
    };

    render() {
        const { task, classes, handleDeleteTask } = this.props;
        return (
            <div className="single-task">
                <Checkbox
                    onChange={this.handleCheckbox}
                    checked={task.isCompleted}
                    style={{ margin: '0' }}
                >
                    <span className={task.isCompleted ? 'strike-through' : ''}>{task.desc}</span>
                </Checkbox>
                <div style={{ display: 'flex' }}>
                    <div style={{ paddingRight: '3rem' }}>
                        {getDateInMonthDDYYYYFormat(new Date(task.date))}
                    </div>
                    <Tooltip title="Delete Task" classes={{ tooltip: classes.lightTooltip }}>
                        <DeleteIcon onClick={() => handleDeleteTask(task.id)} style={{ cursor: 'pointer' }}/>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

SingleTask.propTypes = {
    classes: PropTypes.object.isRequired,
    handleToggleTask: PropTypes.func,
    handleDeleteTask: PropTypes.func,
    task: PropTypes.object,
};

SingleTask.defaultProps = {
    handleToggleTask: () => {},
    handleDeleteTask: () => {},
    task: {},
};

export default withStyles(styles)(SingleTask);