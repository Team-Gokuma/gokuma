from flask import session, request
from flask_restx import Resource
from db_connect import db
from models_db import User, Recipe, RecipeIngrd, RecipeProcess, Ingredients, Refrigerator, Bookmark, UserLike
from api_model.recipe_model import recipe_api, ingrds_fields, response_fail_model, response_success_ingrds_model, response_success_detail_model, response_success_recipe_ingrdnum_model
from recommendFunc.maxIngrds import maxIngrds
from werkzeug.datastructures import FileStorage
import requests
import os

upload_parser = recipe_api.parser()
upload_parser.add_argument('file', location='files',
                           type=FileStorage, required=True)


@recipe_api.route('/recoginition')
class Recoginition(Resource):

    @recipe_api.expect(upload_parser)
    @recipe_api.response(200, 'Success', response_success_ingrds_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def post(self):
        """사진에서 재료를 인식합니다."""

        args = upload_parser.parse_args()
        f = args['file']
        f.save('ai/images/'+f.filename)
        sendFile = {"file": (f.filename, f.stream, f.mimetype)}

        response = requests.post(
            'http://localhost:5000/api/detect/', files=sendFile)
        data = response.json()
        print(data)

        # ingrds에는 재료인식 model을 통과한 class명 들이 담겨져있다.
        ingrds = data['ingredients']

        file = 'ai/images/'+f.filename
        if os.path.isfile(file):
            os.remove(file)

        result = {'result_msg': "success", "data": []}
        for ingrd in ingrds:
            item = Ingredients.query.filter(
                Ingredients.name == ingrd).first()
            if item is not None:
                result['data'].append(
                    {"content": item.name, "category": item.category})
            # 재료 DB에 항목이 없을 경우 기타 항목으로 넣기
            else:
                result['data'].append(
                    {"content": ingrd, "category": 7})

        return result


@recipe_api.route('/recommend')
class Recommend(Resource):

    @recipe_api.expect(ingrds_fields)
    @recipe_api.response(200, 'Success', response_success_recipe_ingrdnum_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def post(self):
        """인식된 재료와 냉장고 재료를 합해 가장 많은 재료를 사용하는 순서대로 레시피를 추천합니다"""

        user = None
        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()

        data = request.get_json()
        ingrds = []
        # user가 없을 경우 넘어온 재료로만 판별
        if user is None:
            ingrds = data['ingredients']
        # user가 있을 경우 냉장고에 저장되었을 것이므로 냉장고에 있는 재료 전부로 판별
        else:
            items = Refrigerator.query.filter(
                Refrigerator.user_id == user.id).all()
            for item in items:
                ingrds.append({"content": item.content,
                              "category": item.category})

        # 레시피 추천 알고리즘 input = 인식된 재료들, output = 추천된 레시피들의 id or name
        items = []
        for ingrd in ingrds:
            items.append(ingrd["content"])

        recipes = maxIngrds(items)

        result = {'result_msg': "success", "data": []}
        for recipe in recipes:
            recipe_id = recipe[0]
            ingrds_num = recipe[2]

            item = Recipe.query.filter(
                Recipe.recipe_id == recipe_id).first()

            result['data'].append(
                {"img": item.img, "id": item.recipe_id, "name": item.name, "ingrdients": ingrds_num})

        return result


@recipe_api.route('/<int:id>')
class Detail(Resource):

    @recipe_api.doc(params={'id': '레시피 ID'})
    @recipe_api.expect(ingrds_fields)
    @recipe_api.response(200, 'Success', response_success_detail_model)
    @recipe_api.response(400, 'Fail', response_fail_model)
    def post(self, id):
        """레시피 디테일 정보를 알려줍니다"""

        user = None
        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()

        item = Recipe.query.filter((Recipe.recipe_id == id)).first()
        if item is None:
            return {"result_msg": "No Such Item"}

        # 초기값 설정
        if item.recipe_id == 1:
            item.like = 1
            db.session.commit()

        # item이 SQLAlchemy Model type이다 보니까 for문으로 작성이 어려운 점이 있었다.
        result = {
            'id': item.recipe_id,
            'name': item.name,
            'like': item.like,
            'summary': item.summary,
            'time': item.time,
            'servings': item.quantity,
            'level': item.level,
            'calorie': item.calorie,
            'img': item.img,
            'video': item.video,
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
                result['bookmark'] = bookmark.checked

            # 유저 좋아요 db에서 user 찾아와서 isLike 설정하기
            like = UserLike.query.filter(
                (UserLike.user_id == user.id) & (UserLike.recipe_id == id)).first()
            if like is not None:
                result['isLike'] = like.checked

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

            else:
                data = request.get_json()
                my_ingrds = data['ingredients']
                for my_ingrd in my_ingrds:
                    if ingrd.name == my_ingrd['content']:
                        ingrd_data['inRefrige'] = True

            result['ingredient'].append(ingrd_data)

        # 레시피 과정 정보
        procs = RecipeProcess.query.filter(RecipeProcess.recipe_id == id).all()
        for proc in procs:
            proc_data = {'step': proc.cooking_no, 'content': proc.content}
            result['recipe'].append(proc_data)

        return result, 200
