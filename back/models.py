from db_connect import db


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


class shoppingList(db.Model):
    __tablename__ = "ShoppingList"
    id = db.Column(db.Integer, nullable=False,
                   primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    content = db.Column(db.Text)
    checked = db.Column(db.Boolean())

    def __init__(self, user_id, content, checked):
        self.user_id = user_id
        self.content = content
        self.checked = checked

    def __str__(self):
        return "<Todo(user_id={},content={}, checked={})>".format(self.user_id, self.content, self.checked)
