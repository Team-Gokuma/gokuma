from flask_restx import Resource, Namespace, fields

user_api = Namespace("User", description='유저 auth API', path="/api/user")

user_signup_model = user_api.model('UserSignup', {
    'nickname': fields.String(description='닉네임', required=True, example='엘리스'),
    'email': fields.String(description='이메일', required=True, example='test@naver.com'),
    'password': fields.String(description='비밀번호', required=True, example='asvd12!!')
})


# shopping_item_id_fields = shopping_api.inherit('ShoppingItem with ID', shopping_item_fields, {
#     'id': fields.Integer(description='장보기 리스트 ID', required=True, example=1)
# })

# response_success_model = shopping_api.model('ResponseSuccess', {
#     'result_msg': fields.String(description='응답 상태', required=True, example='success')
# })

# response_fail_model = shopping_api.model('ResponseFail', {
#     'result_msg': fields.String(description='응답 상태', required=True, example='cause of failure')
# })

# response_success_shopping_item_model = shopping_api.inherit(
#     'ShoppingItemSuccess', response_success_model, {
#         'data': fields.List(fields.Nested(shopping_item_id_fields))
#     })
