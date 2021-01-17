export interface IQuestionData {
  question: string,
  answers: {
    text: string,
    correct: boolean
  }[]
}

export interface IQuizRequest {
  author: string,
  description: string,
  data: IQuestionData[]
}

export interface IAnswerData {
  question: number,
  answers: number[]
}

export interface IAnswerRequest {
  user: string,
  data: IAnswerData[]
}

export { }
