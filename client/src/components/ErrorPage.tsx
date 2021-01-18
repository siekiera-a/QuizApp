import {
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { gameContext } from '../GameContext';

const useStyles = makeStyles({
  margin: {
    marginTop: '16px',
  },
  wrapper: {
    textAlign: 'center',
    marginTop: '20px',
  },
});

interface IProp {
  message: string;
}

const ErrorPage = ({ message }: IProp) => {
  const classes = useStyles();
  const { clearErrors } = useContext(gameContext);
  return (
    <Container maxWidth="md" className={'box'}>
      <Card>
        <Typography
          align="center"
          variant="h4"
          paragraph={true}
          className={classes.margin}
        >
          Some error occured!
        </Typography>
        <CardContent>
          <Typography variant="h6" paragraph={true}>
            {message}
          </Typography>
          <div className={classes.wrapper}>
            <Button variant="contained" color="primary" onClick={clearErrors}>
              OK
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ErrorPage;
