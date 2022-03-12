from flask_restx import Namespace, fields

shopping_api = Namespace(
    "Shopping List", description='장보기 리스트 API', path="/api/shoppingList")

shopping_item_fields = shopping_api.model('ShoppingItem', {
    'content': fields.String(description='재료 이름', required=True, example='고추장'),
    'checked': fields.Boolean(description='체크 여부', required=True, example='false'),
})


shopping_item_id_fields = shopping_api.inherit('ShoppingItemID', shopping_item_fields, {
    'id': fields.Integer(description='장보기 리스트 ID', required=True, example=1)
})

ingrd_fields = shopping_api.model('IngredientShoppingList', {
    'content': fields.String(description='재료 이름', required=True, example='고추장')
})

ingrds_fields = shopping_api.model('IngredientsShoppingList', {
    'ingredients': fields.List(fields.Nested(ingrd_fields))
})

response_success_model = shopping_api.model('ResponseSuccess', {
    'result_msg': fields.String(description='응답 상태', required=True, example='success')
})

response_fail_model = shopping_api.model('ResponseFail', {
    'result_msg': fields.String(description='응답 상태', required=True, example='cause of failure')
})

response_success_shopping_item_model = shopping_api.inherit(
    'ShoppingItemSuccess', response_success_model, {
        'data': fields.List(fields.Nested(shopping_item_id_fields))
    }
)
