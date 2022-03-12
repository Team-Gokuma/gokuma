from flask_restx import Namespace, fields

refrigerator_api = Namespace(
    "Refrigerator", description='냉장고 API', path="/api/refrigerator")

ingrd_fields = refrigerator_api.model('Ingredient', {
    'content': fields.String(description='재료 이름', required=True, example='고추장'),
    'category': fields.Integer(description='재료 카테고리', required=True, example=6)
})

ingrds_fields = refrigerator_api.model('Ingredients', {
    'ingredients': fields.List(fields.Nested(ingrd_fields))
})

ingrd_time_fields = refrigerator_api.inherit('IngrdTime', ingrd_fields, {
    'id': fields.Integer(description='냉장고 DB ID', required=True, example=1),
    'time': fields.String(description='재료가 냉장고에 등록된 시간', required=True, example='2022-02-23')
})

img_fields = refrigerator_api.model('Image', {
    'img': fields.String(description='이미지 url', required=True, example='image url')
})

response_success_model = refrigerator_api.model('ResponseSuccess', {
    'result_msg': fields.String(description='응답 상태', required=True, example='success')
})

response_fail_model = refrigerator_api.model('ResponseFail', {
    'result_msg': fields.String(description='응답 상태', required=True, example='cause of failure')
})

response_success_ingrds_model = refrigerator_api.inherit(
    'IngrdSuccess(Time)', response_success_model, {
        'data': fields.List(fields.Nested(ingrd_time_fields))
    }
)
