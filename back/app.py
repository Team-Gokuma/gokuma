from flask import Flask
from flask_migrate import Migrate
from db_connect import db
from api.user import user_api
from api.shoppingList import shopping_api
from api.recipe import recipe_api
from api.recipe_related import recipe_api
from api.refrigerator import refrigerator_api
from api.bookmark import bookmark_api
from api.userlike import userlike_api
from flask_restx import Api
import config


def create_app(test_config=None):
    app = Flask(__name__)
    api = Api(app, version='1.0', title='고쿠마 냉장고 API 문서',
              description='고쿠마 냉장고의 Back API 문서입니다', doc="/api-docs")
    api.add_namespace(user_api)
    api.add_namespace(shopping_api)
    api.add_namespace(recipe_api)
    api.add_namespace(refrigerator_api)
    api.add_namespace(bookmark_api)
    api.add_namespace(userlike_api)
    app.config.from_object(config)

    db.init_app(app)
    Migrate().init_app(app, db)

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
