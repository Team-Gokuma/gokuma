from flask import session, request
from flask_restx import Resource
from models import User, Recipe, RecipeIngrd, RecipeProcess, Ingredients, Refrigerator, Bookmark, UserLike
from db_connect import db
from api_model.recipe_model import recipe_api, recipes_fields, response_success_recipe_model, response_fail_model


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
