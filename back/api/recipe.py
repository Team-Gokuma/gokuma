from flask import Blueprint, jsonify, session, request
from flask_restx import Resource, Namespace
from models import User, Recipe, RecipeIngrd, RecipeProcess, Ingredients, Refrigerator, Bookmark, UserLike
from db_connect import db
import json

recipe_api = Namespace(
    "Recipe", description='레시피 API', path="/api/recipe")


@recipe_api.route('/recoginition')
class Recoginition(Resource):

    def get(self):
        """사진에서 재료를 인식합니다."""

        # data = request.get_json()
        # img = data['img']

        # 재료인식 알고리즘 input = img, output = 재료
        # Model

        # img -> model -> ingrds?

        ingrds = []

        ingrd = Ingredients.query.filter(Ingredients.id == 1).first()
        ingrds.append(ingrd)

        # ingrds를 여기서 냉장고 db에 저장?

        result = {'ingredients': ingrds}
        return result


@recipe_api.route('/recommend')
class Recommend(Resource):

    def get(self):
        """인식된 재료와 냉장고 재료를 합해 가장 많은 재료를 사용하는 순서대로 레시피를 추천합니다"""
        # data = request.get_json()
        # ingrds = data['ingredients']

        # 레시피 추천 알고리즘 input = 인식된 재료들, output = 추천된 레시피들
        recipes = []

        recipe = Recipe.query.filter(Recipe.id == 1).first()
        recipes.append(recipe)

        result = {'recipes': recipes}
        return result


@recipe_api.route('/related')
class Related(Resource):

    def get(self):
        """관련 레시피를 보여줍니다"""
        # data = request.get_json()
        # ingrds = data['recipes']

        # 관련 레시피 추천 알고리즘 input = 추천된 레시피, output = 추천된 레시피와 관련된 레시피
        recipes = []

        recipe = Recipe.query.filter(Recipe.id == 2).first()
        recipes.append(recipe)

        result = {'recipes': recipes}
        return result


@recipe_api.route('/<int:id>')
class Detail(Resource):

    @recipe_api.doc(params={'id': '레시피 ID'})
    def get(self, id):
        """레시피 디테일 정보를 알려줍니다"""

        user = None
        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()

        item = Recipe.query.filter((Recipe.id == id)).first()
        result = {
            'name': item.name,
            'like': item.like,
            'summary': item.summary,
            'time': item.time,
            'servings': item.quantity,
            'level': item.level,
            'calorie': item.calorie,
            'img': item.img,
            'isLike': False,
            'bookmark': False,
            'ingredient': [],
            'recipe': []
        }

        if user is not None:
            # 유저 찜하기 db에서 user 찾아와서 bookmark 설정하기
            bookmark = Bookmark.query.filter(
                (Bookmark.user_id == user.id) & (Bookmark.recipe_id == id)).first()
            if bookmark is not None:
                result['bookmark'] = bookmark

            # 유저 좋아요 db에서 user 찾아와서 isLike 설정하기
            like = UserLike.query.filter(
                (UserLike.user_id == user.id) & (Bookmark.recipe_id == id)).first()
            if like is not None:
                result['like'] = like

        # 레시피 재료 정보
        ingrds = RecipeIngrd.query.filter(RecipeIngrd.recipe_id == id).all()
        for ingrd in ingrds:
            ingrd_data = {'name': ingrd.name,
                          'amount': ingrd.capacity, 'inRefrige': False}

            if user is not None:
                item = Refrigerator.query.filter((Refrigerator.user_id == user.id) & (
                    Refrigerator.content == ingrd.name)).first()
                if item is not None:
                    ingrd_data['inRefrige'] = True

            result['ingredient'].append(ingrd_data)

        # 레시피 과정 정보
        procs = RecipeProcess.query.filter(RecipeProcess.recipe_id == id).all()
        for proc in procs:
            proc_data = {'step': proc.cooking_no, 'content': proc.content}
            result['recipe'].append(proc_data)

        return result, 200
