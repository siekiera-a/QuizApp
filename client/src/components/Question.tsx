import {
  Card,
  CardContent,
  Container,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
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
  question: {
    backgroundColor: theme.palette.primary.main,
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Question = ({ id, text, answers }: IQuestion) => {
  const classes = useStyles();

  const [answersStatus, setAnswersStatus] = useState(() =>
    answers.map(({ id, text }) => ({
      id,
      text,
      active: false,
    }))
  );

  const toggleStatus = (index: number) => {
    const status = answersStatus[index].active;
    const newArray = [...answersStatus];
    newArray[index].active = !status;
    setAnswersStatus(newArray);
  };

  return (
    <Container maxWidth="md" className={'box'}>
      <Card className={classes.question}>
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
    </Container>
  );
};

export default Question;
