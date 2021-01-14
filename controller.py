from flask import Blueprint, g, jsonify, request
from flask_expects_json import expects_json

from models.quiz import Quiz
from models.question import Question
from models.answer import Answer
from models.score import Score
from schemas.quiz import quiz_schema
from schemas.answer import answer_schema
from app import db
from utils import response_message, int_or_else_get, parse_id, get_random_string, contains_correct_answer

controller = Blueprint('controller', __name__)


@controller.route('/quiz')
def get_quizzes():
    page = request.args.get('page')

    if page is None:
        page = 1
    else:
        # page must be greater or equal 1
        page = max(int_or_else_get(page, 1), 1)

    pagination = Quiz.query.paginate(page=page, per_page=10, error_out=False)

    if len(pagination.items) == 0:
        return response_message({'message': 'No quizzes found!'}, 404)

    response = list(map(lambda i: {
        'id': i.id,
        'code': i.code,
        'author': i.author,
        'creationTime': i.creation_time,
        'description': i.description
    }, pagination.items))

    return jsonify(response)


@controller.route('/quiz', methods=['POST'])
@expects_json(quiz_schema)
def create_quiz():
    data = g.data

    # check if exists question with no correct answer
    for d in data['data']:
        if not contains_correct_answer(d['answers']):
            return response_message({'message': f'Question: "{d["question"]}" does not contain correct answer!'}, 400)

    questions = list(map(
        lambda e: Question(text=e['question'],
                           answers=[Answer(text=a['text'], correct=a['correct']) for a in e['answers']]),
        data['data']))

    quiz = Quiz(code=get_random_string(8), author=data['author'], description=data['description'], questions=questions)

    inserted = False

    while not inserted:
        try:
            db.session.add(quiz)
            db.session.commit()
            inserted = True
        except:
            # db can throw exception if code is not unique
            db.session.rollback()
            quiz.code = get_random_string(8)

    return response_message({'code': quiz.code}, 201)


@controller.route('/quiz/<code>')
def get_quiz_by_code(code):
    quiz_id = Quiz.query.filter_by(code=code).first()

    if quiz_id is None:
        return response_message({'message': f'Quiz with code {code} not found!'}, 404)

    return jsonify({'id': quiz_id})


@controller.route('/quiz/question/<question_id>')
def get_question(question_id):
    question_id = parse_id(question_id)

    if question_id is None:
        return response_message({'message': 'Invalid question id!'}, 400)

    question = Question.query.filter(id=question_id).first()

    if question is None:
        return response_message({'message': f'Question with id {question_id} not found!'}, 404)

    answers = [{'id': a.id, 'text': a.text} for a in question.answers]

    response_data = {
        'id': question.id,
        'text': question.text,
        'answers': answers
    }

    return jsonify(response_data)


@controller.route('/submit/<quiz_id>', methods=['POST'])
@expects_json(answer_schema)
def submit_answers(quiz_id):
    quiz_id = parse_id(quiz_id)

    if quiz_id is None:
        return response_message({'message': 'Invalid quiz id!'}, 400)

    quiz = Quiz.query.filter_by(id=quiz_id).first()

    if quiz is None:
        return response_message({'message', f'Quiz with id {quiz_id} not found!'}, 404)

    questions_with_answers = []

    for question in quiz.questions:
        # sort correct answer's ids
        correct_answers = sorted([a.id for a in question.answers if a.correct is True])
        questions_with_answers = [*questions_with_answers, {'question': question.id, 'answers': correct_answers}]

    data = g.data
    points = 0

    # sort request answer's ids
    for d in data['data']:
        d['answers'] = sorted(d['answers'])

    # check answers
    for q in questions_with_answers:
        if q in data['data']:
            points += 1

    questions_count = len(quiz.questions)
    score = points / questions_count

    # save score to db
    s = Score(quiz_id=quiz.id, user=data['user'], score=score)
    db.session.add(s)
    db.session.commit()

    response = {
        'user': data['user'],
        'score': points,
        'total': questions_count,
        'scoreInPercent': score * 100
    }

    return jsonify(response)


@controller.route('/leaderboard/<quiz_id>')
def get_leaderboard(quiz_id):
    path_param = quiz_id
    quiz_id = parse_id(quiz_id)

    if quiz_id is None:
        return response_message({'message': f'Invalid quiz id ({path_param})!'}, 400)

    quiz = Quiz.query.filter_by(id=quiz_id).first()

    if quiz is None:
        return response_message({'message': f'Not found quiz with id {quiz_id}!'}, 404)

    # limit must be greater or equal 1
    default_limit = 10
    limit_arg = request.args.get('limit')
    limit = default_limit

    if limit_arg is not None:
        limit = max(int_or_else_get(limit_arg, other=default_limit), 1)

    # get leaderboard
    scores = [{'user': s.user, 'score': s.score, 'datetime': s.date} for s in quiz.scores]
    scores = list(sorted(scores, key=lambda s: s['score'], reverse=True))
    scores = scores[:limit]

    response_data = {
        'author': quiz.author,
        'code': quiz.code,
        'description': quiz.description,
        'created': quiz.creation_time,
        'scores': scores
    }

    return jsonify(response_data)
