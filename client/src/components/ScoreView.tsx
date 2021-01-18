import {
  CardContent,
  Typography,
  Card,
  makeStyles,
  Container,
} from '@material-ui/core';
import React from 'react';
import { ISubmitResponse } from '../ResponseApiModels';

const ScoreView = ({ score, scoreInPercent, total, user }: ISubmitResponse) => {
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default ScoreView;
