from flask_restx import Namespace, fields


bookmark_api = Namespace(
    "Bookmark", description='즐겨찾는 레시피 API', path="/api/bookmark")

recipe_fields = bookmark_api.model('BookmarkRecipe', {
    'img': fields.String(description='이미지 url', required=True, example='image url'),
    'id': fields.Integer(description='레시피 ID', required=True, example=1),
    'name': fields.String(description='레시피 이름', required=True, example='나물비빔밥')
})

bookmark_fields = bookmark_api.model('Bookmark', {
    'recipe_id': fields.Integer(description='레시피 ID', required=True, example=1),
    'user_id': fields.Integer(description='유저 ID', required=True, example=1),
    'checked': fields.Boolean(description='북마크 여부', required=True, example='true'),
})

response_success_model = bookmark_api.model('ResponseSuccess', {
    'result_msg': fields.String(description='응답 상태', required=True, example='success')
})

response_fail_model = bookmark_api.model('ResponseFail', {
    'result_msg': fields.String(description='응답 상태', required=True, example='cause of failure')
})

response_success_recipe_model = bookmark_api.inherit(
    'BookmarkRecipeSuccess', response_success_model, {
        'data': fields.List(fields.Nested(recipe_fields))
    }
)

response_success_bookmark_model = bookmark_api.inherit(
    'BookmarkSuccess', response_success_model, {
        'data': fields.List(fields.Nested(bookmark_fields))
    }
)
