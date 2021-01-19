import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useRef, useState } from 'react';
import { IQuestionData } from '../RequestApiModels';

const useStyles = makeStyles({
  wrapper: {
    marginTop: '15px',
    display: 'flex',
  },
  input: {
    flex: '1',
  },
  button: {
    marginLeft: '20px',
  },
  center: {
    textAlign: 'center',
  },
});

const defaultValue: IQuestionData = {
  question: '',
  answers: [],
};

const QuestionMaker = ({
  onQuestionCreated,
}: {
  onQuestionCreated(question: IQuestionData): void;
}) => {
  const classes = useStyles();
  const [question, setQuestion] = useState(defaultValue);
  const answer = useRef<HTMLInputElement>();
  const questionInput = useRef<HTMLInputElement>();

  const handleAddClick = () => {
    const input = answer.current;
    if (input) {
      const text = input.value.trim();
      input.value = '';

      if (text.length > 0 && !question.answers.some((a) => a.text === text)) {
        setQuestion({
          question: question.question,
          answers: [...question.answers, { correct: false, text }],
        });
      }
    }
  };

  const handleCheckboxClick = (answer: string) => {
    const answers = question.answers.map((a) => {
      if (a.text === answer) {
        return {
          text: a.text,
          correct: !a.correct,
        };
      } else {
        return a;
      }
    });

    setQuestion({ question: question.question, answers });
  };

  const handleDeleteClick = (answer: string) => {
    const answers = question.answers.filter((a) => a.text !== answer);
    setQuestion({ question: question.question, answers });
  };

  const onQuestionChange = (text: string) => {
    setQuestion({
      question: text.trim(),
      answers: question.answers,
    });
  };

  const handleCreateQuizButton = () => {
    if (question.question.length > 0) {
      onQuestionCreated(question);
      setQuestion(defaultValue);
      if (questionInput.current) {
        questionInput.current.value = '';
      }
    }
  };

  return (
    <>
      <TextField
        multiline
        label="Question"
        color="secondary"
        fullWidth={true}
        variant="outlined"
        inputRef={questionInput}
        onChange={(e) => onQuestionChange(e.target.value)}
      />
      <div className={classes.wrapper}>
        <TextField
          label="Answer"
          color="secondary"
          className={classes.input}
          variant="outlined"
          inputRef={answer}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleAddClick}
        >
          Add
        </Button>
      </div>

      {question.answers.length > 0 && (
        <>
          <List>
            {question.answers.map((a) => (
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={a.correct}
                    onClick={() => handleCheckboxClick(a.text)}
                  />
                </ListItemIcon>
                <ListItemText>{a.text}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteClick(a.text)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {question.answers.some((a) => a.correct) &&
            question.answers.length >= 2 && (
              <div className={classes.center}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateQuizButton}
                >
                  Create Question
                </Button>
              </div>
            )}
        </>
      )}
    </>
  );
};

export default QuestionMaker;
