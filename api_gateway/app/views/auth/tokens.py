from app.schemes.tokens import TokenSchema
from app.models import User

from flask import request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity


blp = Blueprint(
    'tokens', __name__, url_prefix='/api/auth/tokens',
    description='Operations to get auth tokens and create new users'
)


@blp.route('/')
class Tokens(MethodView):

    @blp.response(200, schema=TokenSchema)
    @jwt_required(refresh=True, optional=True)
    def get(self):
        auth = request.authorization
        if auth and auth.type == 'basic':
            login = auth.get('username')
            password = auth.get('password')

            try:
                user = User.get_user_by_login(login=login)
                if not user.verify_password(password):
                    return jsonify({"message": "error, provided credentials are wrong"}), 401
                else:
                    return jsonify(
                        {
                            "token": user.create_jwt_token(),
                            "refresh": create_refresh_token({"id": user.id})
                        }
                    )
            except User.DoesNotExist:
                return jsonify({"message": "error, provided credentials are wrong"}), 401

        else:
            refresh_identity = get_jwt_identity()
            user_id = refresh_identity.get("id")
            if user_id:
                try:
                    user = User.get(id=user_id)
                    return jsonify({"token": user.create_jwt_token()})
                except User.DoesNotExist:
                    return jsonify({"message": "malformed request"}), 400
            else:
                return jsonify({"message": "malformed request"}), 400
