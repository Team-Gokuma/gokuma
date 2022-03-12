from flask_restx import Namespace, fields

user_api = Namespace("User", description='유저 auth API', path="/api/user")

user_signup_model = user_api.model('UserSignup', {
    'nickname': fields.String(description='닉네임', required=True, example='엘리스'),
    'email': fields.String(description='이메일', required=True, example='test@naver.com'),
    'password': fields.String(description='비밀번호', required=True, example='asvd12!!')
})

user_login_model = user_api.model('UserLogin', {
    'email': fields.String(description='이메일', required=True, example='test@naver.com'),
    'password': fields.String(description='비밀번호', required=True, example='asvd12!!')
})

response_success_model = user_api.model('ResponseSuccess', {
    'result_msg': fields.String(description='응답 상태', required=True, example='success')
})

response_fail_model = user_api.model('ResponseFail', {
    'result_msg': fields.String(description='응답 상태', required=True, example='cause of failure')
})

user_delete_model = user_api.model('UserDelete', {
    'email': fields.String(description='이메일', required=True, example='test@naver.com')
})

user_update_password_model = user_api.model('UpdatePassword', {
    'password': fields.String(description='현재 비밀번호', required=True, example='asvd12!!'),
    'newpassword': fields.String(description='새로운 비밀번호', required=True, example='1234asfd111!!!!')
})

user_update_name_model = user_api.model('UpdateName', {
    'newname': fields.String(description='새로운 닉네임', required=True, example='채셔')
})
