import {
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  Snackbar,
  Theme,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { IQuestion } from '../ResponseApiModels';

const useStyles = makeStyles((theme: Theme) => ({
  answer: {
    marginBottom: '15px',
    cursor: 'pointer',
    '&:last-child': {
      marginBottom: '0px',
    },
  },
  'answers-container': {
    display: 'flex',
    marginTop: '30px',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  index: {
    marginRight: '15px',
  },
  active: {
    backgroundColor: theme.palette.primary.main,
  },
  'button-wrapper': {
    marginTop: '20px',
    textAlign: 'center',
  },
}));

interface IProp {
  onSubmit(question: number, answers: number[]): void;
}

const Question = ({ id, text, answers, onSubmit }: IQuestion & IProp) => {
  const classes = useStyles();

  const [answersStatus, setAnswersStatus] = useState(() =>
    answers.map(({ id, text }) => ({
      id,
      text,
      active: false,
    }))
  );

  useEffect(() => {
    setAnswersStatus(
      answers.map(({ id, text }) => ({
        id,
        text,
        active: false,
      }))
    );
  }, [id, answers]);

  const [open, setOpen] = useState(false);

  const toggleStatus = (index: number) => {
    const status = answersStatus[index].active;
    const newArray = [...answersStatus];
    newArray[index].active = !status;
    setAnswersStatus(newArray);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const selectedAnswers = answersStatus.filter((a) => a.active);

    if (selectedAnswers.length === 0) {
      setOpen(true);
    } else {
      onSubmit(
        id,
        selectedAnswers.map((x) => x.id)
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            {text}
          </Typography>
        </CardContent>
      </Card>

      <div className={classes['answers-container']}>
        {answersStatus.map((a, index) => (
          <Card
            className={
              a.active ? `${classes.active} ${classes.answer}` : classes.answer
            }
            key={a.id}
            onClick={() => toggleStatus(index)}
          >
            <CardContent>
              <Typography variant="h6">
                <span className={classes.index}>{`${index + 1}.`}</span>
                {a.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={classes['button-wrapper']}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
        <Alert severity="info" onClose={handleClose}>
          At least one answer is correct!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Question;
