# pip instal flask_script
# pip install flask_migrate
# pip install psycopg2
#
# python manage.py db init
# python manage.py db migrate
# add imports with models
# python manage.py db upgrade


from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import app, db


migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

db.init_app(app)
migrate.init_app(app, db)

db.session

if __name__ == '__main__':
    manager.run()
