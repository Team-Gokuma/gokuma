from flask import Blueprint, jsonify, session, request
from flask_restx import Resource, Namespace
from models import User
from db_connect import db
import json

refrigerator_api = Namespace(
    "Refrigerator", description='냉장고 API', path="/api/refrigerator")


@refrigerator_api.route('/')
class Refrigerator(Resource):

    def get(self):
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)
