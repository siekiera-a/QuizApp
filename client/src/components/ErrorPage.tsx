import {
  Card,
  CardContent,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles({
  margin: {
    marginTop: '16px',
  },
});

const ErrorPage = ({ location: { state } }: RouteComponentProps) => {
  const classes = useStyles();

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
          <Typography>{(state as { message: string }).message}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ErrorPage;
