from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://arek:pjf2137#@localhost:5432/quiz_app'

db = SQLAlchemy(app)

from controller import controller

app.register_blueprint(controller, url_prefix='/api')

if __name__ == '__main__':
    app.run()
