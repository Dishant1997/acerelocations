import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Draggable from 'react-draggable';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid/index';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const PaperComponent = (props) => {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AddExpenseDialog = ({ openExpense, handleAddExpenses, handleCancleExpenses }) => {
  const classes = useStyles();

  const [fields, setFields] = useState([{ expense: null, amount: null }]);
  const [validateExpenses, updateValidateExpenses] = useState(false);
  const handleChange = (i, event) => {
    const values = [...fields];
    values[i].expense = event.target.value;
    setFields(values);
  };

  const handleChangeAmount = (i, event) => {
    const values = [...fields];
    values[i].amount = event.target.value;
    setFields(values);
  };

  const handleAdd = () => {
    const values = [...fields];
    values.push({ expense: null, amount: null });
    setFields(values);
  };

  const handleRemove = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  };

  useEffect(() => {
    const isValid = !Object.values(fields).some(({ expense, amount }) => {
      if (fields.length < 1) {
        return false;
      }

      return !((expense !== null && amount !== null) || (expense === '' && amount === 0));
    });
    updateValidateExpenses(isValid);
  }, [fields]);

  const isValid = fields.length > 0 && validateExpenses;

  return (
    <Dialog
      fullScreen
      open={openExpense}
      onClose={handleCancleExpenses}
      PaperComponent={PaperComponent}
      aria-labelledby='draggable-dialog-title'
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleCancleExpenses}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Add Expenses
          </Typography>
          <Button
            autoFocus
            color='inherit'
            disabled={!isValid}
            onClick={() => handleAddExpenses(fields)}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
        Expenses
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {fields.map((field, idx) => {
            return (
              <div key={`${field}-${idx}`} style={{ marginBottom: '10px' }}>
                <Grid container lg={7}>
                  <Grid item lg={5} container className={classes.gridItem}>
                    <Box marginRight='10px'>
                      <TextField
                        type='text'
                        placeholder='Enter Expense'
                        label='Expense'
                        variant='outlined'
                        name='expense'
                        value={field.expense || ''}
                        onChange={(e) => handleChange(idx, e)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={5} container className={classes.gridItem}>
                    <Box>
                      <TextField
                        type='number'
                        placeholder='Enter Amount'
                        label='Amount'
                        variant='outlined'
                        name='amount'
                        value={field.amount || ''}
                        onChange={(e) => handleChangeAmount(idx, e)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={2} container className={classes.gridItem}>
                    <Button type='button' onClick={() => handleRemove(idx)}>
                      REMOVE
                    </Button>
                  </Grid>
                </Grid>
              </div>
            );
          })}

          <Button type='button' onClick={() => handleAdd()} marginBottom='10px'>
            Add More
          </Button>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancleExpenses} color='primary'>
          Cancel
        </Button>
        <Button onClick={() => handleAddExpenses(fields)} color='primary' disabled={!isValid}>
          Add Expenses
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseDialog;