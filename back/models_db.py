from db_connect import db

# User


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    name = db.Column(db.VARCHAR(80), nullable=False)
    email = db.Column(db.VARCHAR(120), unique=True, nullable=False)
    password = db.Column(db.VARCHAR(255), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

# ShoppingList


class ShoppingList(db.Model):
    __tablename__ = "ShoppingList"
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'User.id', ondelete='CASCADE'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    checked = db.Column(db.Boolean(), nullable=False)

    def __init__(self, user_id, content, checked):
        self.user_id = user_id
        self.content = content
        self.checked = checked

    def __str__(self):
        return "<Todo(user_id={},content={}, checked={})>".format(self.user_id, self.content, self.checked)

# Recipe


class Recipe(db.Model):
    __tablename__ = "Recipe"
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    recipe_id = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.VARCHAR(255), nullable=False)
    summary = db.Column(db.Text, nullable=True)
    nation = db.Column(db.VARCHAR(255), nullable=True)
    typ = db.Column(db.VARCHAR(255), nullable=True)
    time = db.Column(db.Integer, nullable=True)
    quantity = db.Column(db.Integer, nullable=True)
    level = db.Column(db.Integer, nullable=True)
    calorie = db.Column(db.Integer, nullable=True)
    img = db.Column(db.VARCHAR(255), nullable=True)
    like = db.Column(db.Integer, nullable=False, server_default='0')
    video = db.Column(db.VARCHAR(255), nullable=True)

    def __init__(self, data):
        if type(data) is dict:
            self.recipe_id = data['recipe_id']
            self.name = data['name']
            self.summary = data['summary']
            self.nation = data['nation']
            self.typ = data['typ']
            self.time = data['time']
            self.quantity = data['quantity']
            self.level = data['level']
            self.calorie = data['calorie']
            self.img = data['img']
            self.video = data['video']

    def __str__(self):
        return f'{self.name}\n{self.summary}\n'


class RecipeIngrd(db.Model):
    __tablename__ = "RecipeIngrd"
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(
        'Recipe.recipe_id'), nullable=False)
    name = db.Column(db.VARCHAR(255), nullable=False)
    capacity = db.Column(db.Text, nullable=True)
    typ = db.Column(db.VARCHAR(255), nullable=True)

    def __init__(self, data):
        if type(data) is dict:
            self.recipe_id = data['recipe_id']
            self.name = data['name']
            self.capacity = data['capacity']
            self.typ = data['typ']

    def __str__(self):
        return f'{self.name}\n{self.capacity}\n'


class RecipeProcess(db.Model):
    __tablename__ = "RecipeProcess"
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(
        'Recipe.recipe_id'), nullable=False)
    cooking_no = db.Column(db.Integer, nullable=True)
    content = db.Column(db.Text, nullable=True)

    def __init__(self, data):
        if type(data) is dict:
            self.recipe_id = data['recipe_id']
            self.cooking_no = data['cooking_no']
            self.content = data['content']

    def __str__(self):
        return f'{self.cooking_no}\n{self.content}\n'


# Ingredients

class IngrdCategory(db.Model):
    __tablename__ = 'IngrdCategory'
    name = db.Column(db.VARCHAR(255), nullable=False)
    category = db.Column(db.Integer, primary_key=True, nullable=False)

    def __init__(self, data):
        if type(data) is dict:
            self.name = data['name']
            self.category = data['category']


class Ingredients(db.Model):
    __tablename__ = 'Ingredients'
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    name = db.Column(db.VARCHAR(255), nullable=False)
    category = db.Column(db.Integer,  db.ForeignKey(
        'IngrdCategory.category'), nullable=True)

    def __init__(self, data):
        if type(data) is dict:
            self.name = data['name']
            self.category = data['category']


# # Refrigerator

class Refrigerator(db.Model):
    __tablename__ = 'Refrigerator'
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'User.id', ondelete='CASCADE'))
    content = db.Column(db.VARCHAR(255), nullable=False)
    category = db.Column(db.Integer,  db.ForeignKey(
        'IngrdCategory.category'), nullable=True)
    time = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, content, category, time):
        self.user_id = user_id
        self.content = content
        self.category = category
        self.time = time


# # User Bookmark DB & User like DB

class Bookmark(db.Model):
    __tablename__ = 'Bookmark'
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'User.id', ondelete='CASCADE'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(
        'Recipe.recipe_id'), nullable=False)
    checked = db.Column(db.Boolean())

    def __init__(self, user_id, recipe_id, checked):
        self.user_id = user_id
        self.recipe_id = recipe_id
        self.checked = checked


class UserLike(db.Model):
    __tablename__ = 'UserLike'
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'User.id', ondelete='CASCADE'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(
        'Recipe.recipe_id'), nullable=False)
    checked = db.Column(db.Boolean())

    def __init__(self, user_id, recipe_id, checked):
        self.user_id = user_id
        self.recipe_id = recipe_id
        self.checked = checked
