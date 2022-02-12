from flask import Flask
from flask_migrate import Migrate
from models import User
from db_connect import db
from api.user import user

def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object('config')
    app.register_blueprint(user)
    
    return app

app = create_app()
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def welcome():
    message = "Gokuma is the best!"
    return message

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')