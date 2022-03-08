from flask import session
from flask_restx import Resource
from db_connect import db
from models_db import User, Recipe, Bookmark
from api_model.recipe_model import recipe_api, response_success_recipe_model, response_fail_model
from recommendFunc.bookmarkTaste import bookmarkTaste
import random


@recipe_api.route('/related/bookmark')
class RelatedBookmark(Resource):

    @recipe_api.response(200, 'Success', response_success_recipe_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def get(self):
        """사용자의 즐겨찾기 리스트 기반 추천 레시피입니다."""

        user = None
        result = {"result_msg": "success", "data": []}

        # session['email'] = "admin@gokuma.com"
        # session['email'] = None

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        items = []
        bookmarks = Bookmark.query.filter(Bookmark.user_id == user.id).all()
        for bookmark in bookmarks:
            item = Recipe.query.filter(Recipe.id == bookmark.recipe_id).first()
            items.append(item.name)

        # items = ['까르보나라스파게티']
        # print(items)
        recipes = bookmarkTaste(items)

        # print(recipes)
        for recipe in recipes:
            item = Recipe.query.filter(
                Recipe.name == recipe).first()

            result['data'].append(
                {"img": item.img, "id": item.recipe_id, "name": item.name})

        return result


@recipe_api.route('/related/rank')
class Rank(Resource):

    @recipe_api.response(200, 'Success', response_success_recipe_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def get(self):
        """인기순으로 레시피를 보여줍니다"""

        # 인기 좋아요 더미 데이터로 넣기
        rank_dummy_datas = [(481, 31), (54, 28), (307, 26), (499, 24),
                            (306, 22), (293, 20), (142, 18), (350, 16), (288, 14), (130, 11)]
        for id, like in rank_dummy_datas:
            recipe = Recipe.query.filter(Recipe.recipe_id == id).first()
            recipe.like = like
            db.session.commit()

        limit_num = 8
        related_recipes = Recipe.query.order_by(
            Recipe.like.desc()).limit(limit_num).all()

        result = {'result_msg': "success", "data": []}
        for recipe in related_recipes:
            item = Recipe.query.filter(
                Recipe.recipe_id == recipe.recipe_id).first()
            result['data'].append(
                {"img": item.img, "id": item.recipe_id, "name": item.name})

        return result


# parser 설정
cooktime_parser = recipe_api.parser()
cooktime_parser.add_argument('time', type=int, location='args')


@recipe_api.route('/related/cooktime')
class CookTime(Resource):

    @recipe_api.expect(cooktime_parser)
    @recipe_api.response(200, 'Success', response_success_recipe_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def get(self):
        """조리 시간별로 레시피를 보여줍니다

        query value
        1: 25분 안에 후딱
        2: 30분에서 40분
        3: 50분이상
        """

        args = cooktime_parser.parse_args()
        cooktime = args['time']
        limit_num = 8
        related_recipes = []
        # 1: 25분 안에 후딱/ 2: 30분에서 40분/ 3: 50분이상
        # 시간이 적게 걸리는 순 + 인기도 반영
        if cooktime == 1:
            related_recipes = Recipe.query.filter(
                Recipe.time <= 25).order_by(Recipe.time, Recipe.like.desc()).limit(limit_num).all()
        elif cooktime == 2:
            related_recipes = Recipe.query.filter((Recipe.time > 25) & (
                Recipe.time <= 40)).order_by(Recipe.time, Recipe.like.desc()).limit(limit_num).all()
        elif cooktime == 3:
            related_recipes = Recipe.query.filter(
                (Recipe.time > 40)).order_by(Recipe.time, Recipe.like.desc()).limit(limit_num).all()

        result = {'result_msg': "success", "data": []}
        for recipe in related_recipes:
            item = Recipe.query.filter(
                Recipe.recipe_id == recipe.recipe_id).first()
            result['data'].append(
                {"img": item.img, "id": item.recipe_id, "name": item.name})

        return result


# parser 설정
level_parser = recipe_api.parser()
level_parser.add_argument('level', type=int, location='args')


@recipe_api.route('/related/level')
class level(Resource):

    @recipe_api.expect(level_parser)
    @recipe_api.response(200, 'Success', response_success_recipe_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def get(self):
        """난이도별로 레시피를 보여줍니다

        query value
        1: 초보환영
        2: 보통
        3: 어려움
        """

        args = level_parser.parse_args()
        level = args['level']
        limit_num = 8
        offset_num = random.randint(0, len(Recipe.query.filter(
            Recipe.level == level).all()) - limit_num)

        related_recipes = []
        related_recipes = Recipe.query.filter(Recipe.level == level).order_by(
            Recipe.like.desc()).offset(offset_num).limit(limit_num).all()

        result = {'result_msg': "success", "data": []}
        for recipe in related_recipes:
            item = Recipe.query.filter(
                Recipe.recipe_id == recipe.recipe_id).first()
            result['data'].append(
                {"img": item.img, "id": item.recipe_id, "name": item.name})

        return result


@recipe_api.route('/related/editorpick')
class editorPick(Resource):

    @recipe_api.response(200, 'Success', response_success_recipe_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def get(self):
        """에디터픽 레시피를 보여줍니다. 밑반찬/김치류 모음"""

        limit_num = 8
        offset_num = random.randint(0, len(Recipe.query.filter(
            Recipe.typ == '밑반찬/김치').all()) - limit_num)

        related_recipes = []
        related_recipes = Recipe.query.filter(
            Recipe.typ == '밑반찬/김치').offset(offset_num).limit(limit_num).all()

        result = {'result_msg': "success", "data": []}
        for recipe in related_recipes:
            item = Recipe.query.filter(
                Recipe.recipe_id == recipe.recipe_id).first()
            result['data'].append(
                {"img": item.img, "id": item.recipe_id, "name": item.name})

        return result
