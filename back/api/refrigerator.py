import re
from flask import Blueprint, jsonify, session, request
from flask_restx import Resource, Namespace, reqparse
from sqlalchemy import desc
from models import User, Ingredients, Refrigerator
from db_connect import db
from datetime import datetime
from pytz import timezone

refrigerator_api = Namespace(
    "Refrigerator", description='냉장고 API', path="/api/refrigerator")


@refrigerator_api.route('/')
class Contents(Resource):

    def get(self):
        """냉장고에 유저가 가지고 있는 재료 목록을 보여줍니다."""
        user = None
        result = []

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            return result, 400

        items = Refrigerator.query.filter(
            (Refrigerator.user_id == user.id)).all()

        for item in items:
            result.append({"content": item.content,
                           "category": item.category})

        return result, 200


@refrigerator_api.route('/recoginition/photo')
class RecoginitionPhoto(Resource):

    @refrigerator_api.doc(responses={200: 'Success'})
    @refrigerator_api.doc(responses={400: 'No User'})
    def get(self):
        """냉장고에서 사진으로 재료를 추가합니다."""
        user = None
        result = []

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
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

    # parser = reqparse.RequestParser()
    # parser.add_argument('content', type=str, required=True, location='body')
    # parser.add_argument('category', type=int, required=True, location='body')

    @refrigerator_api.doc(responses={200: 'Success'})
    @refrigerator_api.doc(responses={400: 'No User'})
    def get(self):
        """냉장고에서 텍스트로 재료를 추가합니다."""

        user = None
        result = {"result_msg": "success"}

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "fail"}
            return result, 400

        data = request.get_json()
        content = data['content']
        category = data['category']

        # ingrds를 여기서 냉장고 db에 저장
        new_item = Refrigerator(
            1, content, category, datetime.now(timezone('Asia/Seoul')))
        db.session.add(new_item)
        db.session.commit()

        return result, 200
