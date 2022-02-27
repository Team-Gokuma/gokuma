from flask import session
from flask_restx import Resource
from models import User, Bookmark, Recipe
from db_connect import db
from api_model.bookmark_model import bookmark_api, response_success_recipe_model, response_fail_model, response_success_bookmark_model


@bookmark_api.route('/list')
class BookmarkList(Resource):

    @bookmark_api.response(200, 'Success', response_success_recipe_model)
    @bookmark_api.response(400, 'Fail', response_fail_model)
    def get(self):
        """유저가 즐겨찾기한 레시피들을 출력해줍니다"""

        user = None
        result = {"result_msg": "success", "data": []}

        # session['email'] = "admin@gokuma.com"

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        items = Bookmark.query.filter(
            (Bookmark.user_id == user.id) & (Bookmark.checked == True)).all()

        for item in items:
            recipe = Recipe.query.filter((Recipe.id == item.recipe_id)).first()
            result['data'].append(
                {'id': recipe.id, 'name': recipe.name, 'img': recipe.img})

        return result, 200


@bookmark_api.route('/check/<int:id>')
class BookmarkCheck(Resource):

    @bookmark_api.response(200, 'Success', response_success_bookmark_model)
    @bookmark_api.response(400, 'Fail', response_fail_model)
    def get(self, id):
        """유저가 즐겨찾기한 레시피를 저장/해제합니다"""

        user = None
        result = {"result_msg": "success", "data": []}

        # session['email'] = "admin@gokuma.com"

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        item = Bookmark.query.filter(
            (Bookmark.user_id == user.id) & (Bookmark.recipe_id == id)).first()

        if item is not None:
            item.checked = not item.checked
            result['data'].append(
                {'recipe_id': item.recipe_id, 'user_id': item.user_id, 'checked': item.checked})
        else:
            new_mark = Bookmark(user.id, id, True)
            db.session.add(new_mark)
            result['data'].append(
                {'recipe_id': id, 'user_id': user.id, 'checked': True})
        db.session.commit()

        return result, 200
