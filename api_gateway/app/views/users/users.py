from app.models import User, File
from app.schemes.users import RegisterSchema, EditUserSchema

from passlib.hash import bcrypt

from flask import jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

blp = Blueprint(
    'users', __name__, url_prefix='/api/users',
    description='Upload files endpoints'
)


@blp.route('/')
class Users(MethodView):

    @blp.response(200)
    @jwt_required()
    def get(self):
        users = User.select()
        return jsonify([user.to_dict() for user in users])

    @blp.arguments(RegisterSchema, location='json')
    @blp.response(200)
    def post(self, register_data):
        login = register_data.get("login")
        password = register_data.get("password")

        q = User.select().where(User.login == login)
        if q.exists():
            return jsonify({"message": "User already registered!"}), 409

        try:
            user = User.create(
                **register_data,
                profile_name=register_data.get("login"),
                password_hash=bcrypt.hash(password)
            )
            return jsonify({"message": f"Successfully created user with ID: {user.id}"}), 200

        except:
            return jsonify({"message": "Malformed request!"}), 400


@blp.route('/<int:user_id>')
class UsersById(MethodView):

    @blp.response(200)
    @jwt_required()
    def get(self, user_id):
        identity = get_jwt_identity()

        try:
            current_user = User.get(login=identity.get("login"))
            requested_user = User.get(id=user_id)
        except User.DoesNotExist:
            return jsonify({"message": "Malformed request"}), 400

        return jsonify(requested_user.to_dict())

    @blp.arguments(EditUserSchema, location='json')
    @blp.response(200)
    @jwt_required()
    def put(self, new_data, user_id):
        identity = get_jwt_identity()

        try:
            current_user = User.get(login=identity.get("login"))
        except User.DoesNotExist:
            return jsonify({"message": "User does not exist"}), 400

        if current_user.id != user_id:
            return jsonify({"message": "You are not allowed"}), 400

        profile_picture_path = new_data.get("profile_picture")
        if profile_picture_path:
            try:
                file = File.get(path=profile_picture_path)
            except File.DoesNotExist:
                return jsonify({"message": "File does not exist"}), 400

            current_user.profile_picture = file
            current_user.save()

        profile_name = new_data.get("profile_name")
        if profile_name:
            current_user.profile_name = profile_name
            current_user.save()

        old_password = new_data.get("old_password")
        new_password = new_data.get("new_password")
        if all((old_password, new_password)):
            if not current_user.verify_password(old_password):
                return jsonify({"message": "Old password is wrong"}), 400
            else:
                current_user.password_hash = bcrypt.hash(new_password)
                current_user.save()

        return jsonify({"message": "Edit successful"}), 200
