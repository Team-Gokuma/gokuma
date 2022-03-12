from flask import request, session, jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from flask_restx import Resource
from db_connect import db
from models_db import User
from api_model.user_model import user_api, user_signup_model, user_login_model, response_success_model, response_fail_model, user_delete_model, user_update_password_model, user_update_name_model


@user_api.route('/temp', doc=False)
class testUserApi(Resource):
    def get(self):
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)


@user_api.route('/signup')
@user_api.expect(user_signup_model)
@user_api.response(200, 'Success', response_success_model)
@user_api.response(404, 'Fail', response_fail_model)
class UserSignup(Resource):
    def post(self):
        '''유저 회원가입'''
        params = request.get_json()
        name = params['nickname']
        email = params['email']
        password = params['password']

        message = None
        if name == None:
            message = "닉네임을 작성해주세요"
        elif email == None:
            message = "이메일을 작성해주세요"
        elif password == None:
            message = "비밀번호를 작성해주세요"
        else:
            message = None

        user = User.query.filter(User.email == email).first()
        if user is not None:
            message = f'{user.name} 계정은 이미 등록된 계정입니다.'

        if message is None:
            # 유저 테이블에 추가
            user = User(name, email, generate_password_hash(password))
            db.session.add(user)
            db.session.commit()
            message = '회원가입이 완료되었습니다.'
            value = {"status": 200, "result": "success", "msg": message}
        else:
            value = {"status": 404, "result": "fail", "msg": message}
        return jsonify(value)


@user_api.route('/login')
@user_api.expect(user_login_model)
@user_api.response(404, 'Fail', response_fail_model)
class UserLogin(Resource):
    def post(self):
        '''유저 로그인'''
        params = request.get_json()
        email = params['email']
        password = params['password']
        message = None
# 새로고침때마다 isLogin이라는 api호출 후 세션에 정보가 들어있다면
# 이메일, 닉네임같은 정보를 리턴해준다-> 상태관리가 필요없다!
        user = User.query.filter(User.email == email).first()
        name = user.name
        if user is None:
            message = '등록되지 않은 계정입니다.'
        elif not check_password_hash(user.password, password):
            message = '비밀번호가 틀렸습니다.'
        elif len(password) < 8:
            message = '비밀번호가 8자리 이상이어야 합니다.'
# 세션은 서버에서 쿠키역할 -> 주기를 정할수있지만 지금은 무한,
        if message is None:
            session['email'] = user.email
            message = '로그인에 성공하였습니다.'
            value = {"status": 200, "result": "success",
                     "msg": message, "email": email, "password": password, "name": name}

        else:
            value = {"status": 404, "result": "fail", "msg": message}

        return jsonify(value)


@user_api.route('/logout')
@user_api.response(400, 'Fail', response_fail_model)
class UserLogin(Resource):
    def get(self):
        '''유저 로그아웃'''
        message = None
        if session.get('email'):
            session.pop('email')
            message = "로그아웃에 성공하였습니다."
            value = {"status": 200, "result": "success", "msg": message}
        else:
            message = "로그아웃에 실패하였습니다."
            value = {"status": 404, "result": "fail", "msg": message}
        return jsonify(value)


@user_api.route('/delete')  # 회원탈퇴
@user_api.expect(user_delete_model)
@user_api.response(200, 'Success', response_success_model)
@user_api.response(400, 'Fail', response_fail_model)
class UserDelete(Resource):
    def post(self):
        '''유저 회원탈퇴'''
        params = request.get_json()
        email = params['email']

        message = None
        user = User.query.filter(User.email == email).first()
        if user != None:
            session.pop('email')
            User.query.filter(User.email == email).delete()
            db.session.commit()
            message = "회원탈퇴에 성공하였습니다."
            value = {"status": 200, "result": "success", "msg": message}
        else:
            message = "회원탈퇴에 실패하였습니다."
            value = {"status": 400, "result": "fail", "msg": message}
        return jsonify(value)


@user_api.route('/passupdate')  # 비밀번호 변경
@user_api.expect(user_update_password_model)
@user_api.response(200, 'Success', response_success_model)
@user_api.response(400, 'Fail', response_fail_model)
class UserPassUpdate(Resource):
    def post(self):
        '''유저 비밀번호 변경'''
        params = request.get_json()
        password = params['password']
        newpassword = params['newpassword']
        message = None
        if session['email'] == None:
            message = "비밀번호변경 실패"
            value = {"status": 400,  "result": "fail", "msg": message}
        else:
            user = User.query.filter(User.email == session['email']).first()
            if check_password_hash(user.password, password):
                user.password = generate_password_hash(newpassword)
            message = "비밀번호변경 성공"
            value = {"status": 200,  "result": "success", "msg": message}
        db.session.commit()
        return jsonify(value)


@user_api.route('/nameupdate')  # 닉네임변경
@user_api.expect(user_update_name_model)
@user_api.response(200, 'Success', response_success_model)
@user_api.response(400, 'Fail', response_fail_model)
class UserNameUpdate(Resource):
    def post(self):
        '''유저 닉네임 변경'''
        params = request.get_json()
        newname = params['newname']
        message = None
        if session['email'] == None:
            message = "닉네임변경 실패"
            value = {"status": 400,  "result": "fail", "msg": message}
        else:
            user = User.query.filter(User.email == session['email']).first()
            user.name = newname
            message = "닉네임변경 성공"
            value = {"status": 200,  "result": "success", "msg": message}
        db.session.commit()
        return jsonify(value)


@user_api.route('/islogin')
class UserIsLogin(Resource):
    def get(self):
        '''로그인 여부를 판정하는 api'''
        if session.get('email'):
            email = session['email']
            user = User.query.filter(User.email == email).first()
            name = user.name
            message="현재 로그인 되어있습니다"
            value = {"status": 200, "result": "success",
                     "msg": message, "email": email, "name": name}
        else:
            message = "로그아웃된 상태입니다"
            value = {"status": 404, "result": "fail", "msg": message}
        return jsonify(value)
