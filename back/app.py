from flask import Flask, request
from flask_migrate import Migrate
from models import User
from db_connect import db
from api.user import user, user_api
from flask_restx import Api, Resource, reqparse


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object('config')
    # app.register_blueprint(user)

    return app


app = create_app()
db.init_app(app)
migrate = Migrate(app, db)

api = Api(app, version='1.0', title='API 문서',
          description='Swagger 문서', doc="/api-docs")

test_api = api.namespace('test', description='조회 API')
api.add_namespace(user_api)


# @app.route('/')
# def welcome():
#     if request.method == 'GET':
#         message = "Gokuma is the best!"
#         return message


@test_api.route('/')
class welcomeApi(Resource):
    # @test_api.response(200, 'Successfully created')
    # @test_api.response(400, 'Bad Request')
    def get(self):
        message = "Gokuma is the best!"
        return message


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
