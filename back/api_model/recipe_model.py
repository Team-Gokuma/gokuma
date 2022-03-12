from flask_restx import Namespace, fields


recipe_api = Namespace(
    "Recipe", description='레시피 API', path="/api/recipe")

ingrd_fields = recipe_api.model('Ingredient', {
    'content': fields.String(description='재료 이름', required=True, example='고추장'),
    'category': fields.Integer(description='재료 카테고리', required=True, example=6)
})

ingrd_time_fields = recipe_api.inherit('IngrdTime', ingrd_fields, {
    'time': fields.String(description='재료가 냉장고에 등록된 시간', required=True, example='2022-02-23')
})

ingrds_fields = recipe_api.model('Ingredients', {
    'ingredients': fields.List(fields.Nested(ingrd_fields))
})

recipe_ingrd_fields = recipe_api.model('RecipeIngredient', {
    'name': fields.String(
        description='재료 이름', required=True, example='고추장'),
    'amount': fields.String(description='재료 양', required=True, example='2스푼'),
    'inRefrige': fields.Boolean(description='사용자의 냉장고 DB에 있는지 여부', required=True, example=False)
})

recipe_proc_fields = recipe_api.model('RecipeProcess', {
    'step': fields.Integer(
        description='과정 순서', required=True, example=1),
    'content': fields.String(description='과정', required=True, example='마늘종 300g을 4cm길이로 썰어주세요')
})


recipe_fields = recipe_api.model('Recipe', {
    'img': fields.String(description='이미지 url', required=True, example='image url'),
    'id': fields.Integer(description='레시피 ID', required=True, example=1),
    'name': fields.String(description='레시피 이름', required=True, example='나물비빔밥'),

})

recipe_ingrdnum_fields = recipe_api.inherit('RecipeIngrdNum', recipe_fields, {
    'ingredients': fields.Integer(description='냉장고 재료 사용 수', required=True, example=5)
})

recipes_fields = recipe_api.model('Recipes', {
    'recipes': fields.List(fields.Nested(recipe_fields))
})


recipe_detail_fields = recipe_api.inherit('RecipeDetail', recipe_fields, {
    'summary': fields.String(description='레시피 설명', required=True, example='영양만점 나물비빔밥!'),
    'time': fields.Integer(description='조리 시간', required=True, example=60),
    'like': fields.Integer(description='좋아요 수', required=True, example=10),
    'servings': fields.Integer(description='몇 인분', required=True, example=2),
    'level': fields.Integer(description='레벨', required=True, example=1),
    'calorie': fields.Integer(description='칼로리', required=True, example=100),
    'isLike': fields.Boolean(description='유저가 좋아요 눌렀는지 여부', required=True, example=False),
    'bookmark': fields.Boolean(description='유저가 즐겨찾기했는지 여부', required=True, example=False),
    'video': fields.String(description='유튜브 동영상 ID', required=True, example='youtube_video_id'),
    'ingredient': fields.List(fields.Nested(recipe_ingrd_fields)),
    'recipe': fields.List(fields.Nested(recipe_proc_fields))
})

img_fields = recipe_api.model('Image', {
    'img': fields.String(description='이미지 url', required=True, example='image url')
})

response_success_model = recipe_api.model('ResponseSuccess', {
    'result_msg': fields.String(description='응답 상태', required=True, example='success')
})

response_fail_model = recipe_api.model('ResponseFail', {
    'result_msg': fields.String(description='응답 상태', required=True, example='cause of failure')
})

response_success_recipe_model = recipe_api.inherit(
    'RecipeSuccess', response_success_model, {
        'data': fields.List(fields.Nested(recipe_fields))
    }
)

response_success_recipe_ingrdnum_model = recipe_api.inherit(
    'RecipeIngrdNumSuccess', response_success_model, {
        'data': fields.List(fields.Nested(recipe_ingrdnum_fields))
    }
)

response_success_ingrds_model = recipe_api.inherit(
    'IngrdSuccess', response_success_model, {
        'data': fields.List(fields.Nested(ingrd_fields))
    }
)

response_success_detail_model = recipe_api.inherit(
    'RecipeDetailSuccess', response_success_model, {
        'data': fields.List(fields.Nested(recipe_detail_fields))
    }
)
