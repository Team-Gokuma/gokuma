import re
from flask import Blueprint, jsonify, session, request
from flask_restx import Resource, Namespace, reqparse, fields
from sqlalchemy import desc
from models import User, Ingredients, Refrigerator, RecipeIngrd
from db_connect import db
from datetime import datetime
from pytz import timezone

refrigerator_api = Namespace(
    "Refrigerator", description='냉장고 API', path="/api/refrigerator")

ingrd_fields = refrigerator_api.model('Ingredient', {
    'content': fields.String(description='재료 이름', required=True, example='고추장'),
    'category': fields.Integer(description='재료 카테고리', required=True, example=6)
})

img_fields = refrigerator_api.model('Image', {
    'img': fields.String(description='이미지 url', required=True, example='image url')
})

response_success_model = refrigerator_api.model('ResponseSuccess', {
    'result_msg': fields.String(description='응답 상태', required=True, example='success')
})

response_fail_model = refrigerator_api.model('ResponseFail', {
    'result_msg': fields.String(description='응답 상태', required=True, example='cause of failure')
})

response_success_ingrds_model = refrigerator_api.inherit(
    'IngrdSuccess', response_success_model, {
        'data': fields.List(fields.Nested(ingrd_fields))
    })


@refrigerator_api.route('/list')
class Contents(Resource):

    @refrigerator_api.response(200, 'Success', response_success_ingrds_model)
    @refrigerator_api.response(400, 'Fail', response_fail_model)
    def get(self):
        """냉장고에 유저가 가지고 있는 재료 목록을 보여줍니다"""

        user = None
        result = {"result_msg": "success"}

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        items = Refrigerator.query.filter(
            (Refrigerator.user_id == user.id)).all()

        for item in items:
            result.append({"content": item.content,
                           "category": item.category})

        return result, 200


@refrigerator_api.route('/recoginition/photo')
class RecoginitionPhoto(Resource):

    @refrigerator_api.expect(img_fields)
    @refrigerator_api.response(200, 'Success', response_success_ingrds_model)
    @refrigerator_api.response(400, 'Fail', response_fail_model)
    def post(self):
        """냉장고에서 사진으로 재료를 추가합니다"""

        user = None
        result = {"result_msg": "success"}

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        # data = request.get_json()
        # img = data['img']

        # 재료인식 알고리즘 input = img, output = 재료

        # img -> model -> ingrds?

        ingrds = []

        ingrd = Ingredients.query.filter(Ingredients.id == 1).first()
        ingrds.append(ingrd)

        # ingrds를 여기서 냉장고 db에 저장

        result = {'ingredients': ingrds}
        return result


@refrigerator_api.route('/recoginition/text')
class RecoginitionText(Resource):

    # formData
    # parser = reqparse.RequestParser()
    # parser.add_argument('content', type=str, required=True, location='body')
    # parser.add_argument('category', type=int, required=True, location='body')

    @refrigerator_api.expect(ingrd_fields)
    @refrigerator_api.response(200, 'Success', response_success_ingrds_model)
    @refrigerator_api.response(400, 'Fail', response_fail_model)
    def post(self):
        """냉장고에서 텍스트로 재료를 추가합니다"""

        user = None
        result = {"result_msg": "success"}

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        data = request.get_json()
        content = data['content']
        category = data['category']

        item = Refrigerator.query.filter(
            Refrigerator.content == content).first()
        if item is None:
            # ingrds를 여기서 냉장고 db에 저장
            new_item = Refrigerator(
                1, content, category, datetime.now(timezone('Asia/Seoul')))
            db.session.add(new_item)
            db.session.commit()
            result['data'] = {'content': content, 'category': category}
        else:
            result = {"result_msg": "Already Exists"}
            return result, 400

        return result, 200


@refrigerator_api.route('/time')
class IngrdTime(Resource):

    @refrigerator_api.response(200, 'Success', response_success_ingrds_model)
    @refrigerator_api.response(400, 'Fail', response_fail_model)
    def get(self):
        """5일 이상 지난 재료들의 목록"""
        user = None
        result = {"result_msg": "success", "data": []}

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "fail"}
            return result, 400

        items = Refrigerator.query.filter(
            Refrigerator.user_id == user.id).all()

        for item in items:
            if item.time.day - datetime.now().day >= 5:
                result['data'].append({"content": item.content,
                                       "category": item.category})

        return result, 200
