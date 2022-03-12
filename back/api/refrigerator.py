from flask import session, request
from flask_restx import Resource
from db_connect import db
from models_db import User, Ingredients, Refrigerator
from api_model.refrigerator_model import refrigerator_api, response_fail_model, response_success_ingrds_model, ingrds_fields, response_success_model
from datetime import datetime
from pytz import timezone


@refrigerator_api.route('/list')
@refrigerator_api.response(200, 'Success', response_success_ingrds_model)
@refrigerator_api.response(400, 'Fail', response_fail_model)
class Contents(Resource):

    def get(self):
        """냉장고에 유저가 가지고 있는 재료 목록을 보여줍니다"""

        user = None
        result = {"result_msg": "success", "data": []}

        # session['email'] = "admin@gokuma.com"

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        items = Refrigerator.query.filter(
            (Refrigerator.user_id == user.id)).all()

        for item in items:
            result['data'].append({
                "id": item.id,
                "content": item.content,
                "category": item.category,
                "time": item.time.strftime("%Y-%m-%d")
            })

        return result, 200

    def delete(self):
        '''냉장고의 모든 재료 항목을 삭제합니다'''

        user = None
        result = {"result_msg": "success", "data": []}

        # session['email'] = "admin@gokuma.com"
        # session['email'] = None

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
            items = Refrigerator.query.filter(
                Refrigerator.user_id == user.id).all()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        for item in items:
            db.session.delete(item)
            db.session.commit()
            ret_item = {
                "id": item.id,
                "content": item.content,
                "category": item.category,
                "time": item.time.strftime("%Y-%m-%d")
            }
            result['data'].append(ret_item)

        return result


@refrigerator_api.route('/save')
class Save(Resource):

    @refrigerator_api.expect(ingrds_fields)
    @refrigerator_api.response(200, 'Success', response_success_model)
    @refrigerator_api.response(400, 'Fail', response_fail_model)
    def post(self):
        """냉장고에 재료를 저장합니다"""

        user = None
        result = {"result_msg": "success"}

        # session['email'] = "admin@gokuma.com"

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        data = request.get_json()
        ingrds = data['ingredients']

        result = {'result_msg': "success"}
        for ingrd in ingrds:
            item = Ingredients.query.filter(
                Ingredients.name == ingrd["content"]).first()
            if item is not None:
                new_item = Refrigerator.query.filter(
                    (Refrigerator.user_id == user.id) & (Refrigerator.content == item.name)).first()
                if new_item is None:
                    new = Refrigerator(
                        user.id, item.name, item.category, datetime.now(timezone('Asia/Seoul')))
                    db.session.add(new)
                    db.session.commit()
                else:
                    # 냉장고 DB에 이미 존재한다. 타임 업데이트
                    new_item.time = datetime.now(timezone('Asia/Seoul'))
                    db.session.commit()
            else:
                # 재료DB에 없는 재료를 냉장고에 넣으려한다.
                new = Refrigerator(user.id, ingrd["content"], ingrd["category"],
                                   datetime.now(timezone('Asia/Seoul')))
                db.session.add(new)
                db.session.commit()
                new_ingrd = Ingredients(
                    {"name": ingrd["content"], "category": ingrd["category"]})
                db.session.add(new_ingrd)
                db.session.commit()

        return result, 200


@refrigerator_api.route('/time')
class IngrdTime(Resource):

    @refrigerator_api.response(200, 'Success', response_success_ingrds_model)
    @refrigerator_api.response(400, 'Fail', response_fail_model)
    def get(self):
        """5일 이상 지난 재료들의 목록"""
        user = None
        result = {"result_msg": "success", "data": []}

        # session['email'] = "admin@gokuma.com"

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        items = Refrigerator.query.filter(
            Refrigerator.user_id == user.id).all()

        for item in items:
            if item.time.day - datetime.now().day >= 5:
                result['data'].append({
                    "id": item.id,
                    "content": item.content,
                    "category": item.category,
                    "time": item.time.strftime("%Y-%m-%d")})

        return result, 200


@refrigerator_api.route('/delete/<int:id>')
class DeleteItem(Resource):

    @refrigerator_api.response(200, 'Success', response_success_ingrds_model)
    @refrigerator_api.response(400, 'Fail', response_fail_model)
    def delete(self, id):
        '''해당 항목을 삭제합니다'''

        user = None
        result = {"result_msg": "success", "data": []}

        # session['email'] = "admin@gokuma.com"
        # session['email'] = None

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
            items = Refrigerator.query.filter(
                Refrigerator.user_id == user.id).all()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        # 이미 리스트에 존재하는지 확인
        exist = False
        for item in items:
            if item.id == id:
                exist = True
                break

        # 존재할 경우 삭제
        if exist == True:
            del_item = Refrigerator.query.filter(
                Refrigerator.id == id).first()
            db.session.delete(del_item)
            db.session.commit()
            ret_item = {
                "id": del_item.id,
                "content": del_item.content,
                "category": del_item.category,
                "time": del_item.time.strftime("%Y-%m-%d")
            }
            result['data'].append(ret_item)
        # 존재하지 않을 경우 에러
        else:
            result = {"result_msg": "Do not Exists"}
            return result, 400

        return result
