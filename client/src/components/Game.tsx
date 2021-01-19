import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { gameContext } from '../GameContext';
import { IQuestion } from '../ResponseApiModels';
import Question from './Question';
import Submit from './Submit';

const useStyles = makeStyles({
  center: {
    textAlign: 'center',
  },
});

const Game = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>();
  const [question, setQuestion] = useState<IQuestion>();
  const [nextQuestion, setNextQuestion] = useState<boolean>();
  const [submitted, setSubmitted] = useState(false);

  const { hasNextQuestion, answerTheQuestion, getQuestion } = useContext(
    gameContext
  );

  useEffect(() => {
    if (hasNextQuestion()) {
      setLoading(true);
      getQuestion()
        .then((q) => {
          setQuestion(q);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [nextQuestion]);

  const handleSubmit = (question: number, answers: number[]) => {
    answerTheQuestion(question, answers);
    if (hasNextQuestion()) {
      setNextQuestion(true);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return <Submit />;
  }

  return loading ? (
    <div className={classes.center}>
      <CircularProgress />
    </div>
  ) : (
    <>
      {question && (
        <Question
          id={question.id}
          answers={question.answers}
          text={question.text}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Game;
