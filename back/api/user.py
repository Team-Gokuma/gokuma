from flask import Blueprint, request, session, jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from flask_restx import Api, Resource, reqparse, Namespace
import re

from models import User
from db_connect import db

user = Blueprint("user", __name__, url_prefix="/api/user")
user_api = Namespace("User", description='유저 auth API', path="/api/user")

@user_api.route('/temp', doc=False)
class testUserApi(Resource):
    def get(self):
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)


@user_api.route('/signup')
class UserSignup(Resource):
    def post(self):
        params = request.get_json()
        name = params['nickname']
        email = params['email']
        password = params['password']

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
class UserLogin(Resource):
    def post(self):
        params = request.get_json()
        email = params['email']
        password = params['password']
        message = None

        user = User.query.filter(User.email == email).first()
        if user is None:
            message = '등록되지 않은 계정입니다.'
        elif not check_password_hash(user.password, password):
            message = '비밀번호가 틀렸습니다.'
        elif len(password) < 8:
            message = '비밀번호가 8자리 이상이어야 합니다.'
#세션은 서버에서 쿠키역할 -> 주기를 정할수있지만 지금은 무한, 
        if message is None:
            session['email'] = user.email
            message = '로그인에 성공하였습니다.'
            value = {"status": 200, "result": "success",
                     "msg": message}
        else:
            value = {"status": 404, "result": "fail", "msg": message}

        return jsonify(value)


@user_api.route('/logout')
class UserLogin(Resource):
    def get(self):
        if session.get('email'):
            session.pop('email')
            value = {"status": 200, "result": "success"}
        else:
            value = {"status": 404, "result": "fail"}
        return jsonify(value)

@user_api.route('/delete')#회원탈퇴
class UserDelete(Resource):
    def post(self):
        params = request.get_json()
        email=params['email']
        user = User.query.filter(User.email == email).first()
        if user!=None:
            User.query.filter(User.email == email).delete()
            db.session.commit()
            value = {"status": 200, "result": "success"}
        else:
            value = {"status": 400, "result": "fail"}
        return jsonify(value)

@user_api.route('/passupdate')#비밀번호 변경
class UserPassUpdate(Resource):
    def post(self):
        params = request.get_json()
        password = params['password']
        newpassword = params['newpassword']
        if session['email']==None:
            value = {"status": 400,  "result": "fail"}
        else:
            user = User.query.filter(User.email == session['email']).first()
            if check_password_hash(user.password, password):
                user.password=generate_password_hash(newpassword)
            value = {"status": 200,  "result": "success"}
        db.session.commit()
        return jsonify(value)

@user_api.route('/nameupdate')#닉네임변경
class UserNameUpdate(Resource):
    def post(self):
        params=request.get_json()
        newname = params['newname']
        if session['email']==None:
            value = {"status": 400,  "result": "fail"}
        else:
            user = User.query.filter(User.email==session['email']).first()
            user.name = newname
            value = {"status": 200,  "result": "success"}
        db.session.commit()
        return value
