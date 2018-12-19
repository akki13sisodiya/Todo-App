import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField/TextField";
import {getDateInYYYYMMDDHyphen} from "../constants/commonUtils";

const styles = () => ({
    paper: {
        borderRadius: '1rem',
        height: '20rem',
    },
    inputlabel: {
        fontSize: '16px'
    },
});

class AddNewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            date: new Date(),
            errorText: null,
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleDateChange = (date) => {
        this.setState({ date: new Date(date.target.value)});
    };

    handleSave = () => {
        const { onSave } = this.props;
        const { value, date } = this.state;
        console.log('sdfsadfsdaf', date);
        onSave(value, date);
    };

    render() {
        const { value } = this.state;
        const { onCancel, classes } = this.props;
        const helperText = (!!value) ? '' : <span className="error">*Required Field</span>;
        console.log('sdafsdfsdafsdaf', helperText, !!value, value.length);
        return (
            <Dialog
                open
                classes={{
                    paper: classes.paper,
                }}
                onClose={onCancel}
            >
                <DialogTitle style={{ padding: '1rem 0', background: '#337ab7', color: 'white' }}>
                    <div style={{ color: 'white', padding: '0 1rem', fontSize: '1em' }}>Add New Task</div>
                </DialogTitle>
                <DialogContent>
                    <Grid container style={{ marginTop: '1rem' }}>
                        <TextField
                            value={value}
                            label="Enter Task Name"
                            multiline
                            rows={1}
                            rowsMax={7}
                            helperText={helperText}
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <div style={{ marginTop: '2em' }}>
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                onChange={this.handleDateChange}
                                defaultValue={getDateInYYYYMMDDHyphen(new Date())}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '2em' }}>
                        <Button onClick={onCancel} style={{ background: '#d4d4d4', fontWeight: '500' }}>Cancel</Button>
                        <Button
                            bsStyle="primary"
                            style={{ marginLeft: '2rem' }}
                            onClick={this.handleSave}
                            disabled={!value}
                        >
                            Add
                        </Button>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    }
}

AddNewTask.propTypes = {
    classes: PropTypes.object.isRequired,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    taskName: PropTypes.string,
    handleChange: PropTypes.func,
};

AddNewTask.defaultProps = {
    onAdd: () => {},
    onCancel: () => {},
    taskName: '',
    handleChange: () => {},
};

export default withStyles(styles)(AddNewTask);
