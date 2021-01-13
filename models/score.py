from app import db
from datetime import datetime


class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)
    user = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    score = db.Column(db.Float, nullable=False)