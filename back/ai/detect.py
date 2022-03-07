from flask_restx import Resource, Namespace, fields
from werkzeug.datastructures import FileStorage
import requests
from flask import session, request

detect_api = Namespace(
    "Detection", description='AI YOLOv5', path="/api/detect")

upload_parser = detect_api.parser()
upload_parser.add_argument('file', location='files',
                           type=FileStorage, required=True)


@detect_api.route('/')
class Detection(Resource):

    def get(self):
        """테스트 용"""
        return "detection get"

    @detect_api.expect(upload_parser)
    def post(self):
        """테스트 용"""

        args = upload_parser.parse_args()
        uploaded_file = args['file']
        # uploaded_file = request.get_json()
        print("u", uploaded_file)

        return "detection post"
