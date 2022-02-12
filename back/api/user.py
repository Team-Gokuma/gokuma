from flask import Blueprint, request, session, jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

import re

from models import User
from db_connect import db

user = Blueprint("user", __name__, url_prefix="/api/user")


@user.route('/temp')
def testUserApi():
    if request.method == 'GET':
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)

