from flask import jsonify, session, request
from flask_restx import Resource
from db_connect import db
from models_db import User, ShoppingList
from api_model.shoppingList_model import shopping_api, response_success_shopping_item_model, response_fail_model, shopping_item_fields, shopping_item_id_fields, ingrds_fields


@shopping_api.route('/list')
@shopping_api.response(200, 'Success', response_success_shopping_item_model)
@shopping_api.response(400, 'Fail', response_fail_model)
class shoppingLists(Resource):

    def get(self):
        '''장보기 리스트를 보여줍니다.'''

        # session['email'] = "admin@gokuma.com"
        # session['email'] = None

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
            items = ShoppingList.query.filter(
                ShoppingList.user_id == user.id).all()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        result = {"result_msg": "success", "data": []}
        for item in items:
            ret_item = {
                "id": item.id,
                "content": item.content,
                "checked": item.checked
            }
            result['data'].append(ret_item)
        return jsonify(result)

    def delete(self):
        '''장보기 리스트 전체 항목을 삭제합니다'''

        user = None
        result = {"result_msg": "success", "data": []}

        # session['email'] = "admin@gokuma.com"
        # session['email'] = None

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
            items = ShoppingList.query.filter(
                ShoppingList.user_id == user.id).all()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        for item in items:
            db.session.delete(item)
            db.session.commit()
            ret_item = {
                "id": item.id,
                "content": item.content,
                "checked": item.checked
            }
            result['data'].append(ret_item)

        return result


@shopping_api.route('/')
@shopping_api.response(200, 'Success', response_success_shopping_item_model)
@shopping_api.response(400, 'Fail', response_fail_model)
class shoppingListItem(Resource):

    def _get_items(self):
        # session['email'] = "admin@gokuma.com"
        # session['email'] = None

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
            items = ShoppingList.query.filter(
                ShoppingList.user_id == user.id).all()
            result = {"result_msg": "success", "data": []}
            return result, items, user
        else:
            result = {"result_msg": "No User"}
            return result, None, None

    @shopping_api.expect(shopping_item_fields)
    def post(self):
        '''새로운 항목을 추가합니다'''

        result, items, user = self._get_items()

        if user is None:
            return result, 400

        data = request.get_json()
        content = data['content']
        checked = data['checked']

        # 이미 리스트에 존재하는지 확인
        exist = False
        for item in items:
            if item.content == data['content']:
                exist = True
                break

        # 리스트에 없을 경우 추가
        print("exist:", exist)
        if exist == False:
            new_item = ShoppingList(
                user.id, content, checked)
            db.session.add(new_item)
            db.session.commit()
            ret_item = {
                "id": new_item.id,
                "content": content,
                "checked": checked
            }
            result['data'].append(ret_item)
            return result, 200
        else:
            result = {"result_msg": "Already Exists"}
            return result, 400

    @shopping_api.expect(shopping_item_id_fields)
    def delete(self):
        '''해당 항목을 삭제합니다'''
        result, items, user = self._get_items()

        if user is None:
            return result, 400

        data = request.get_json()
        content = data['content']
        checked = data['checked']
        id = data['id']

        # 이미 리스트에 존재하는지 확인
        exist = False
        for item in items:
            if item.content == content:
                exist = True
                break

        # 존재할 경우 삭제
        if exist == True:
            del_item = ShoppingList.query.filter(
                ShoppingList.content == content).first()
            db.session.delete(del_item)
            db.session.commit()
            ret_item = {
                "id": del_item.id,
                "content": content,
                "checked": checked
            }
            result['data'].append(ret_item)
        # 존재하지 않을 경우 에러
        else:
            result = {"result_msg": "Do not Exists"}
            return result, 400

        return result

    @shopping_api.expect(shopping_item_id_fields)
    def put(self):
        '''
        해당 항목의 내용과 체크사항을 수정합니다

        Parameter:
        - content: 수정한 content 내용
        - checked: 수정한 checked 상태
        '''

        result, items, user = self._get_items()

        if user is None:
            return result, 400

        data = request.get_json()
        content = data['content']
        checked = data['checked']
        id = data['id']

        # 이미 리스트에 존재하는지 확인
        exist = False
        for item in items:
            if item.id == id:
                exist = True
                break

        # 존재할 경우 새로 받은 content로 내용 변경
        if exist == True:
            update_item = ShoppingList.query.filter(
                ShoppingList.id == id).first()
            update_item.content = content
            update_item.checked = checked
            db.session.commit()
            ret_item = {
                "id": update_item.id,
                "content": content,
                "checked": checked
            }
            result['data'].append(ret_item)

        # 존재하지 않을 경우 에러
        else:
            result = {"result_msg": "Do not Exists"}
            return result, 400

        return result


@shopping_api.route('/lackingrds')
class shoppingListPush(Resource):

    @shopping_api.expect(ingrds_fields)
    def post(self):
        '''레시피 디테일 페이지에서 없는 재료를 장보기 리스트에 넣어줍니다'''

        user = None
        result = {"result_msg": "success"}

        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
        else:
            result = {"result_msg": "No User"}
            return result, 400

        data = request.get_json()
        contents = data['ingredients']
        print("contents: ", contents)
        items = ShoppingList.query.filter(
            ShoppingList.user_id == user.id).all()

        exist = False
        for content in contents:
            for item in items:
                # 이미 리스트에 존재하는지 확인
                if item.content == content['content']:
                    exist = True
                    break

            if exist == False:
                new_item = ShoppingList(
                    user.id, content['content'], False)
                db.session.add(new_item)
                db.session.commit()
            else:
                exist = False

        return result, 200


@shopping_api.route('/<id>', doc=False)
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
