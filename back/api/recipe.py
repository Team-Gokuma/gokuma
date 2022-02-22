from flask import Blueprint, jsonify, session, request
from flask_restx import Resource, Namespace, fields
from models import User, Recipe, RecipeIngrd, RecipeProcess, Ingredients, Refrigerator, Bookmark, UserLike
from db_connect import db
import json

recipe_api = Namespace(
    "Recipe", description='레시피 API', path="/api/recipe")

ingrd_fields = recipe_api.model('Ingredient', {
    'content': fields.String(description='재료 이름', required=True, example='고추장'),
    'category': fields.Integer(description='재료 카테고리', required=True, example=6)
})

ingrds_fields = recipe_api.model('Ingredients', {
    'ingredients': fields.List(fields.Nested(ingrd_fields))
})

recipe_ingrd_fields = recipe_api.model('RecipeIngredient', {
    'name': fields.String(
        description='재료 이름', required=True, example='고추장'),
    'amount': fields.String(description='재료 양', required=True, example='2스푼'),
    'inRefrige': fields.Boolean(description='사용자의 냉장고 DB에 있는지 여부', required=True, example=False)
})

recipe_proc_fields = recipe_api.model('RecipeProcess', {
    'step': fields.Integer(
        description='과정 순서', required=True, example=1),
    'content': fields.String(description='과정', required=True, example='마늘종 300g을 4cm길이로 썰어주세요')
})


recipe_fields = recipe_api.model('Recipe', {
    'img': fields.String(description='이미지 url', required=True, example='image url'),
    'id': fields.Integer(description='레시피 ID', required=True, example=1),
    'name': fields.String(description='레시피 이름', required=True, example='나물비빔밥')
})

recipes_fields = recipe_api.model('Recipes', {
    'recipes': fields.List(fields.Nested(recipe_fields))
})

recipe_detail_fields = recipe_api.inherit('RecipeDetail', recipe_fields, {
    'summary': fields.String(description='레시피 설명', required=True, example='영양만점 나물비빔밥!'),
    'time': fields.Integer(description='조리 시간', required=True, example=60),
    'like': fields.Integer(description='좋아요 수', required=True, example=10),
    'servings': fields.Integer(description='몇 인분', required=True, example=2),
    'level': fields.Integer(description='레벨', required=True, example=1),
    'calorie': fields.Integer(description='칼로리', required=True, example=100),
    'isLike': fields.Boolean(description='유저가 좋아요 눌렀는지 여부', required=True, example=False),
    'bookmark': fields.Boolean(description='유저가 즐겨찾기했는지 여부', required=True, example=False),
    'ingredient': fields.List(fields.Nested(recipe_ingrd_fields)),
    'recipe': fields.List(fields.Nested(recipe_proc_fields))

})

img_fields = recipe_api.model('Image', {
    'img': fields.String(description='이미지 url', required=True, example='image url')
})

response_success_model = recipe_api.model('ResponseSuccess', {
    'result_msg': fields.String(description='응답 상태', required=True, example='success')
})

response_fail_model = recipe_api.model('ResponseFail', {
    'result_msg': fields.String(description='응답 상태', required=True, example='cause of failure')
})

response_success_recipe_model = recipe_api.inherit(
    'RecipeSuccess', response_success_model, {
        'data': fields.List(fields.Nested(recipe_fields))
    })

response_success_ingrds_model = recipe_api.inherit(
    'IngrdSuccess', response_success_model, {
        'data': fields.List(fields.Nested(ingrd_fields))
    })

response_success_detail_model = recipe_api.inherit(
    'RecipeDetailSuccess', response_success_model, {
        'data': fields.List(fields.Nested(recipe_detail_fields))
    })


@recipe_api.route('/recoginition')
class Recoginition(Resource):

    @recipe_api.expect(img_fields)
    @recipe_api.response(200, 'Success', response_success_ingrds_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def post(self):
        """사진에서 재료를 인식합니다."""

        data = request.get_json()
        img = data['img']

        # 재료인식 알고리즘 input = img, output = 재료
        # Model

        # img -> model -> ingrds?

        # ingrds에는 재료인식 model을 통과한 class명 들이 담겨져있다.
        ingrds = ['딸기', '당근', '닭가슴살']

        # ingrds를 여기서 냉장고 db에 저장?

        result = {'result_msg': "success", "data": []}
        for ingrd in ingrds:
            item = Ingredients.query.filter(
                Ingredients.name == ingrd).first()
            result['data'].append(
                {"content": item.name, "category": item.category})

        return result


@recipe_api.route('/recommend')
class Recommend(Resource):

    @recipe_api.expect(ingrds_fields)
    @recipe_api.response(200, 'Success', response_success_recipe_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def post(self):
        """인식된 재료와 냉장고 재료를 합해 가장 많은 재료를 사용하는 순서대로 레시피를 추천합니다"""
        data = request.get_json()
        ingrds = data['ingredients']

        # 레시피 추천 알고리즘 input = 인식된 재료들, output = 추천된 레시피들의 id or name
        recipes = [1, 2, 3, 4, 5]

        result = {'result_msg': "success", "data": []}
        for recipe in recipes:
            item = Recipe.query.filter(
                Recipe.id == recipe).first()
            result['data'].append(
                {"img": item.img, "id": item.id, "name": item.name})

        return result


@recipe_api.route('/related')
class Related(Resource):

    @recipe_api.expect(recipes_fields)
    @recipe_api.response(200, 'Success', response_success_recipe_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def post(self):
        """관련 레시피를 보여줍니다"""
        data = request.get_json()
        recipes = data['recipes']

        # 관련 레시피 추천 알고리즘 input = 추천된 레시피, output = 추천된 레시피와 관련된 레시피
        related_recipes = [6, 7, 8, 9, 10]

        result = {'result_msg': "success", "data": []}
        for recipe in related_recipes:
            item = Recipe.query.filter(
                Recipe.id == recipe).first()
            result['data'].append(
                {"img": item.img, "id": item.id, "name": item.name})

        return result


@recipe_api.route('/<int:id>')
class Detail(Resource):

    @recipe_api.doc(params={'id': '레시피 ID'})
    @recipe_api.response(200, 'Success', response_success_detail_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def get(self, id):
        """레시피 디테일 정보를 알려줍니다"""

        user = None
        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()

        item = Recipe.query.filter((Recipe.id == id)).first()
        result = {
            'id': item.id,
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
