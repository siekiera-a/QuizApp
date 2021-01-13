from flask import Blueprint

controller = Blueprint('controller', __name__)


@controller.route('/quiz')
def get_quizzes():
    pass


@controller.route('/quiz', methods=['POST'])
def create_quiz():
    pass


@controller.route('/quiz/<quiz_id>/<question_id>')
def get_question(quiz_id, question_id):
    pass


@controller.route('/submit/<quiz_id>', methods=['POST'])
def submit_answers(quiz_id):
    pass


@controller.route('/leaderboard/<quiz_id>')
def get_leaderboard(quiz_id):
    pass
