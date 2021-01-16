import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

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
});

const StartQuiz = () => {
  const classes = useStyles();
  const input = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const handleClick = () => {
    if (input.current !== null) {
      const code = input.current.value;
      input.current.value = '';
      history.push(`/play/${code}`);
    }
  };

  return (
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
  );
};

export default StartQuiz;
