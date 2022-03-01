from flask import request, session, jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from flask_restx import Api, Resource, reqparse, Namespace
from models import User
from db_connect import db
from api_model.user_model import user_api, user_signup_model

@user_api.route('/temp', doc=False)
class testUserApi(Resource):
    def get(self):
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)


@user_api.route('/signup')
@user_api.expect(user_signup_model)
class UserSignup(Resource):
    def post(self):
        '''유저 회원가입'''
        params = request.get_json()
        name = params['nickname']
        email = params['email']
        password = params['password']

        message = None
        if name==None:
            message = "닉네임을 작성해주세요"
        elif email==None:
            message = "이메일을 작성해주세요"
        elif password==None:
            message = "비밀번호를 작성해주세요"
        else:
            message=None

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
class UserLogin(Resource):
    def post(self):
        '''유저 로그인'''
        params = request.get_json()
        email = params['email']
        password = params['password']
        message = None

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
class UserLogin(Resource):
    def get(self):
        '''유저 로그아웃'''
        message = None
        if session.get('email'):
            session.pop('email')
            message = "로그아웃에 성공하였습니다."
            value = {"status": 200, "result": "success", "msg":message}
        else:
            message = "로그아웃에 실패하였습니다."
            value = {"status": 404, "result": "fail", "msg":message}
        return jsonify(value)


@user_api.route('/delete')  # 회원탈퇴
class UserDelete(Resource):
    def post(self):
        '''유저 회원탈퇴'''
        params = request.get_json()
        email = params['email']

        message = None
        user = User.query.filter(User.email == email).first()
        if user != None:
            User.query.filter(User.email == email).delete()
            db.session.commit()
            message = "회원탈퇴에 성공하였습니다."
            value = {"status": 200, "result": "success", "msg":message}
        else:
            message = "회원탈퇴에 실패하였습니다."
            value = {"status": 400, "result": "fail", "msg":message}
        return jsonify(value)


@user_api.route('/passupdate')  # 비밀번호 변경
class UserPassUpdate(Resource):
    def post(self):
        '''유저 비밀번호 변경'''
        params = request.get_json()
        password = params['password']
        newpassword = params['newpassword']
        message = None
        if session['email'] == None:
            message="비밀번호변경 실패"
            value = {"status": 400,  "result": "fail", "msg":message}
        else:
            user = User.query.filter(User.email == session['email']).first()
            if check_password_hash(user.password, password):
                user.password = generate_password_hash(newpassword)
            message="비밀번호변경 성공"
            value = {"status": 200,  "result": "success", "msg":message}
        db.session.commit()
        return jsonify(value)


@user_api.route('/nameupdate')  # 닉네임변경
class UserNameUpdate(Resource):
    def post(self):
        '''유저 닉네임 변경'''
        params = request.get_json()
        newname = params['newname']
        message=None
        if session['email'] == None:
            message="닉네임변경 실패"
            value = {"status": 400,  "result": "fail", "msg":message}
        else:
            user = User.query.filter(User.email == session['email']).first()
            user.name = newname
            message="닉네임변경 성공"
            value = {"status": 200,  "result": "success", "msg":message}
        db.session.commit()
        return value
