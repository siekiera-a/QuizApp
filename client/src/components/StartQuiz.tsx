import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import React, { useContext, useRef, useState } from 'react';
import { gameContext } from '../GameContext';

const useStyles = makeStyles({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '35px',
  },
  button: {
    marginLeft: '20px',
  },
  loader: {
    marginTop: '20px',
    textAlign: 'center',
  },
});

const StartQuiz = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const { startGame } = useContext(gameContext);

  const handleClick = () => {
    if (input.current !== null) {
      const code = input.current.value;
      input.current.value = '';
      startGame(code).then((success) => {
        if (!success) {
          setOpen(true);
        }
        setLoading(false);
      });
      setLoading(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className={classes.center}>
        <TextField
          id="code"
          label="code"
          variant="outlined"
          color="secondary"
          inputProps={{ maxLength: 8 }}
          inputRef={input}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
          onClick={handleClick}
        >
          Join
        </Button>
      </div>
      {loading && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}

      <Snackbar open={open} onClose={handleClose} autoHideDuration={3500}>
        <Alert severity="error" onClose={handleClose}>
          Quiz not found!
        </Alert>
      </Snackbar>
    </>
  );
};

export default StartQuiz;
