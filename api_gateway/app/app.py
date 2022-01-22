from datetime import timedelta

from flask import Flask
from flask_smorest import Api
from flask_jwt_extended import JWTManager

from app.settings import JWT_SECRET
from app.views import blp as heartbeats_blp
from app.views.auth.tokens import blp as jwt_blp
from app.views.users.users import blp as users_blp


def register_api_blueprints(api):
    api.register_blueprint(heartbeats_blp)
    api.register_blueprint(jwt_blp)
    api.register_blueprint(users_blp)


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config["DEBUG"] = False
    app.config['API_TITLE'] = 'INT20H Task'
    app.config['API_VERSION'] = 'v1'
    app.config['OPENAPI_VERSION'] = '3.0.3'
    app.config["JWT_SECRET_KEY"] = JWT_SECRET
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    JWTManager(app)
    api = Api(app)
    register_api_blueprints(api)
    return app
