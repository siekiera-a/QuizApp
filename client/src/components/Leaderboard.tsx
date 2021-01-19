import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  makeStyles,
  Button,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api';
import { ILeaderboard } from '../ResponseApiModels';

interface IProps {
  code: string;
  closeLeaderboard(): void;
}

const useStyles = makeStyles((theme) => ({
  header: {
    background: theme.palette.background.default,
  },
  loader: {
    textAlign: 'center',
  },
  wrapper: {
    marginTop: '25px',
    textAlign: 'center',
  },
}));

const Leaderboard = ({ code, closeLeaderboard }: IProps) => {
  const [leaderboard, setLeaderboard] = useState<ILeaderboard>();
  const classes = useStyles();

  useEffect(() => {
    const url = `/leaderboard/${code}`;

    try {
      const response = fetchApi<ILeaderboard>(url);
      response.then((x) => setLeaderboard(x)).catch((e) => closeLeaderboard());
    } catch (e) {
      closeLeaderboard();
    }
  }, [code, closeLeaderboard]);

  const format = new Intl.DateTimeFormat('pl', {
    /// @ts-ignore
    timeStyle: 'short',
    dateStyle: 'short',
  });

  return leaderboard ? (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            paragraph={true}
            align="center"
            color="secondary"
          >
            Quiz {leaderboard.code} created by {leaderboard.author} at:
            {format.format(new Date(leaderboard.creationTime))}
          </Typography>

          <Typography variant="h6" paragraph={true}>
            {leaderboard.description}
          </Typography>

          {leaderboard.scores.length === 0 ? (
            <Typography variant="h6" paragraph={true} align="center">
              No one solved this quiz yet!
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow className={classes.header}>
                  <TableCell>User</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.scores.map((s, index) => (
                  <TableRow key={index}>
                    <TableCell>{s.user}</TableCell>
                    <TableCell>{Math.round(s.score * 100)}%</TableCell>
                    <TableCell>{format.format(new Date(s.datetime))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={closeLeaderboard}
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  ) : (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  );
};

export default Leaderboard;
