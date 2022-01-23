import uuid
from io import BytesIO

from app.schemes.files import FileQueryArgs
from app.models import File
from app.settings import AWS_ACCESS_KEY_ID, AWS_ACCESS_SECRET_KEY, S3_BUCKET

import boto3
from flask import jsonify, request
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required

blp = Blueprint(
    'files', __name__, url_prefix='/api/files',
    description='Upload files endpoints'
)


s3 = boto3.client('s3',
                  aws_access_key_id=AWS_ACCESS_KEY_ID,
                  aws_secret_access_key=AWS_ACCESS_SECRET_KEY
                  )


@blp.route('/')
class Files(MethodView):

    @blp.arguments(FileQueryArgs, location='query')
    @blp.response(200)
    @jwt_required()
    def post(self, args):
        file_data = request.get_data()

        if file_data:
            path = f"{str(uuid.uuid4())}/{args.get('name')}"
            file = File.create(path=path, filename=args.get("name"))

            s3.upload_fileobj(
                Fileobj=BytesIO(file_data),
                Bucket=S3_BUCKET,
                Key=path
            )

            return jsonify({"filename": file.filename, "path": path})
        else:
            return jsonify({"message": "No file contents found"}), 400


@blp.route('/<string:path>')
class FileById(MethodView):

    @blp.response(200)
    def get(self, path):
        try:
            file = File.get(path=path)
            return file.to_dict()
        except File.DoesNotExist:
            return jsonify({"message": "Not found"}), 404
