import {
  CardContent,
  Typography,
  Card,
  Container,
  Button,
  makeStyles,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { gameContext } from '../GameContext';
import { ISubmitResponse } from '../ResponseApiModels';

const useStyles = makeStyles({
  wrapper: {
    marginTop: '20px',
    textAlign: 'center',
  },
});

const ScoreView = ({ score, scoreInPercent, total, user }: ISubmitResponse) => {
  const classes = useStyles();
  const { endGame } = useContext(gameContext);

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" paragraph={true}>
            Congrats {user}!
          </Typography>
          <Typography variant="h5" align="center">
            Your score is {`${score}/${total}`}. It's{' '}
            {Math.round(scoreInPercent)}%
          </Typography>

          <div className={classes.wrapper}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={endGame}
            >
              Close quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ScoreView;
