import {
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import React, { useContext, useRef, useState } from 'react';
import { gameContext } from '../GameContext';
import { ISubmitResponse } from '../ResponseApiModels';
import ScoreView from './ScoreView';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '320px',
    marginRight: '30px',
  },
  card: {
    maxWidth: '500px',
    margin: 'auto',
  },
  progress: {
    textAlign: 'center',
    marginTop: '30px',
  },
});

const Submit = () => {
  const input = useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const { submitAnswers } = useContext(gameContext);
  const [score, setScore] = useState<ISubmitResponse>();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (input.current) {
      const username: string = input.current.value.trim();
      if (username.length > 0) {
        input.current.value = '';
        setLoading(true);
        submitAnswers(username).then((result) => {
          if (result) {
            setScore(result);
          }
          setLoading(false);
        });
      }
    }
  };

  if (score) {
    return (
      <ScoreView
        score={score.score}
        scoreInPercent={score.scoreInPercent}
        total={score.total}
        user={score.user}
      />
    );
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.container}>
        <TextField
          label="Your username"
          variant="outlined"
          inputRef={input}
          className={classes.input}
          color="secondary"
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleClick}
        >
          Submit
        </Button>
      </CardContent>

      {loading && (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
    </Card>
  );
};

export default Submit;
