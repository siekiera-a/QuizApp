from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import getenv

app = Flask(__name__, static_folder='client/build')

CORS(app, resources=[r"/api/*", {"origins": "*"}])

db_user = getenv('POSTGRES_USER')
db_password = getenv('POSTGRES_PASSWORD')
db_name = getenv('POSTGRES_DB')
db_server = getenv('DB_SERVER')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@{db_server}:5432/{db_name}'

db = SQLAlchemy(app)

from controller import controller

app.register_blueprint(controller, url_prefix='/api')

if __name__ == '__main__':
    app.run()
