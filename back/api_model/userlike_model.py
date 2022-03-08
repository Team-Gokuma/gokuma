from flask_restx import Namespace, fields


userlike_api = Namespace(
    "UserLike", description='좋아요 레시피 API', path="/api/userlike")

recipe_id_fields = userlike_api.model('RecipeId', {
    'id': fields.Integer(description='레시피 id', required=True, example=6)
})
