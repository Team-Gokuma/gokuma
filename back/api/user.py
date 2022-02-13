from flask import Blueprint, request, session, jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from flask_restx import Api, Resource, reqparse, Namespace
import re

from models import User
from db_connect import db

user = Blueprint("user", __name__, url_prefix="/api/user")
user_api = Namespace("user_api", path="/api/user")


# @user.route('/temp')
# def testUser():
#     if request.method == 'GET':
#         gokuma = User.query.filter(User.name == 'gokuma').first()
#         return str(gokuma.name)


@user_api.route('/temp')
class testUserApi(Resource):
    def get(self):
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)
