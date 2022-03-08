from flask import session
from flask_restx import Resource
from models_db import User, UserLike, Recipe
from db_connect import db
from api_model.userlike_model import userlike_api


@userlike_api.route('/check/<int:id>')
class LikeCheck(Resource):

    @userlike_api.doc(responses={200: 'Success'})
    @userlike_api.doc(responses={400: 'No User'})
    def get(self, id):
        """유저가 레시피에 좋아요를 눌렀을때 좋아요 개수 저장"""
        # session['email'] = "admin@gokuma.com"
        user = None
        result = {"result_msg": "success", "data": []}

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "fail", "data": []}
            return result, 400

        item = UserLike.query.filter(
            (UserLike.user_id == user.id) & (UserLike.recipe_id == id)).first()
        recipe = Recipe.query.filter(Recipe.recipe_id == id).first()
        if item is not None:
            # 이미 좋아요를 눌렀다면
            if recipe.like == 0:
                item.checked = not item.checked
                recipe.like += 1
            else:
                item.checked = not item.checked
                recipe.like -= 1
        else:
            # 새로 좋아요를 누른다면
            new_like = UserLike(user.id, id, True)
            recipe.like += 1
            db.session.add(new_like)
        db.session.commit()

        return result, 200
