from flask import Blueprint, jsonify, session, request
from flask_restx import Resource, Namespace
from models import User, Recipe, RecipeIngrd, RecipeProcess, Ingredients, Refrigerator
from db_connect import db
import json

recipe_api = Namespace(
    "Recipe", description='레시피 API', path="/api/recipe")


@recipe_api.route('/recoginition')
class Recoginition(Resource):

    def get(self):
        # data = request.get_json()
        # img = data['img']

        # 재료인식 알고리즘 input = img, output = 재료
        ingrds = []

        ingrd = Ingredients.query.filter(Ingredients.id == 1).first()
        ingrds.append(ingrd)

        # ingrds를 여기서 냉장고 db에 저장?

        result = {'ingredients': ingrds}
        return result


@recipe_api.route('/recommend')
class Recommend(Resource):

    def get(self):
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
        # data = request.get_json()
        # ingrds = data['recipes']

        # 관련 레시피 추천 알고리즘 input = 추천된 레시피, output = 추천된 레시피와 관련된 레시피
        recipes = []

        recipe = Recipe.query.filter(Recipe.id == 2).first()
        recipes.append(recipe)

        result = {'recipes': recipes}
        return result


@recipe_api.route('/<id>')
class Detail(Resource):

    def get(self, id):

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

        # 유저 찜하기 db에서 user 찾아와서 bookmark 설정하기
        # 유저 좋아요 db에서 user 찾아와서 isLike 설정하기
        # if user is not None:

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
