from flask import Blueprint, jsonify, session, request
from flask_restx import Resource, Namespace
from models import User, ShoppingList
from db_connect import db
import json

shopping_api = Namespace(
    "Shopping List", description='장보기 리스트 API', path="/api/shoppingList")


@shopping_api.route('/')
class shoppingLists(Resource):

    def _get_list(self):
        # user_email = session['email']
        # user_id = User.query.filter(User.email == user_email).first().id
        user_id = 1
        list = ShoppingList.query.filter(ShoppingList.user_id == user_id).all()
        return list

    # 데이터 조회
    def get(self):

        list = self._get_list()
        ret = []
        for item in list:
            print(item.id, item.content, item.checked)
            # ingdr = ingredients.query.filter(ingredients.id == item.id).first()
            # item_name = ingdr.name
            ret_item = {
                "id": item.id,
                # "name": item_name,
                "content": item.content,
                "checked": item.checked
            }
            ret.append(ret_item)
        return jsonify(ret)

    # 데이터 생성
    def post(self):
        # data = request.get_json()
        list = self._get_list()
        exist = False
        try:
            data = {'user_id': '1', 'content': '감자수제비', 'checked': False}
            print(data['user_id'])
            for item in list:
                print(item.id, item.content, item.checked)
                print(item.content, data['content'],
                      item.content == data['content'], item.content == data['content'])
                if item.content == data['content']:
                    exist = True
                    break

            print("exist:", exist)
            if exist == False:
                new_item = ShoppingList(
                    data['user_id'], data['content'], data['checked'])
                db.session.add(new_item)
                db.session.commit()
                result = data, 200

            else:
                result = {
                    'result_msg': f'오류발생 ::: 이미 존재하는 상품입니다.'
                }, 400

        except Exception as e:
            result = {
                'result_msg': f'오류발생 ::: {e}'
            }, 400

        return result

    # 데이터 삭제
    def delete(self):
        list = self._get_list()
        exist = False
        try:
            data = {'user_id': '1', 'content': '감자수제비', 'checked': False}
            print(data['user_id'])
            for item in list:
                if item.content == data['content']:
                    exist = True
                    db.session.delete(item)
                    db.session.commit()
                    break

            print("exist:", exist)
            if exist == False:
                result = {
                    'result_msg': f'오류발생 ::: 존재하지 않는 상품입니다.'
                }, 400
            else:
                result = data, 200

        except Exception as e:
            result = {
                'result_msg': f'오류발생 ::: {e}'
            }, 400

        return result


@shopping_api.route('/<id>')
class shoppingItem(Resource):

    def get(self, id):
        user_id = 1
        item = ShoppingList.query.filter(
            (ShoppingList.user_id == user_id) & (ShoppingList.id == id)).first()
        result = {
            'user_id': item.user_id,
            'content': item.content,
            'checked': item.checked
        }
        return result, 200
