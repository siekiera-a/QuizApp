from app import db


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)
    text = db.Column(db.String, nullable=False)
    answers = db.relationship('Answer', backref='question', lazy=True)
