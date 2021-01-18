import {
  Card,
  CardContent,
  Container,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { StaticContext } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    marginTop: '16px',
  },
  link: {
    color: theme.palette.text.primary,
  },
}));

interface IProp {
  message: string;
  link?: string;
}

const ErrorPage = ({
  location: { state },
}: RouteComponentProps<{}, StaticContext, IProp>) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
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
          <Typography>
            {state.message}{' '}
            {state.link && (
              <>
                Go to{' '}
                <Link to={state.link} className={classes.link}>
                  quiz.
                </Link>
              </>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ErrorPage;
