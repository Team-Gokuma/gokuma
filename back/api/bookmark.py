from flask import Blueprint, jsonify, session, request
from flask_restx import Resource, Namespace
from pyrsistent import CheckedKeyTypeError
from models import User, Bookmark, Recipe
from db_connect import db
import json

bookmark_api = Namespace(
    "Bookmark", description='즐겨찾는 레시피 API', path="/api/bookmark")


@bookmark_api.route('/list')
class BookmarkList(Resource):

    @bookmark_api.doc(responses={200: 'Success'})
    @bookmark_api.doc(responses={400: 'No User'})
    def get(self):
        """유저가 즐겨찾기한 레시피들을 출력해줍니다"""

        user = None
        result = {"result_msg": "success", "data": []}

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "fail", "data": []}
            return result, 400

        items = Bookmark.query.filter(
            Bookmark.user_id == user.id).all()

        for item in items:
            recipe = Recipe.query.filter(Recipe.id == item.recipe_id).first()
            result['data'].append({'id': item.recipe_id, 'name': recipe.name})

        return result, 200


@bookmark_api.route('/check/<int:id>')
class BookmarkCheck(Resource):

    @bookmark_api.doc(responses={200: 'Success'})
    @bookmark_api.doc(responses={400: 'No User'})
    def get(self, id):
        """유저가 즐겨찾기한 레시피를 저장합니다"""

        user = None
        result = {"result_msg": "success", "data": []}

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "fail", "data": []}
            return result, 400

        item = Bookmark.query.filter(
            (Bookmark.user_id == user.id) & (Bookmark.recipe_id == id)).first()

        if item is not None:
            item.checked = ~item.checked
        else:
            new_mark = Bookmark(user.id, id, True)
            db.session.add(new_mark)
        db.session.commit()

        return result, 200
