from flask import Blueprint, jsonify, session, request
from flask_restx import Resource, Namespace
from models import User
from db_connect import db
import json

recipe_api = Namespace(
    "Recipe", description='레시피 API', path="/api/recipe")


@recipe_api.route('/recoginition')
class Recoginition(Resource):

    def get(self):
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)


@recipe_api.route('/recommend')
class Recommend(Resource):

    def get(self):
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)


@recipe_api.route('/search')
class Search(Resource):

    def get(self):
        gokuma = User.query.filter(User.name == 'gokuma').first()
        return str(gokuma.name)
