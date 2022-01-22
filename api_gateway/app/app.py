from datetime import timedelta

from flask import Flask
from flask_smorest import Api
from flask_jwt_extended import JWTManager

from app.settings import JWT_SECRET
from app.views import blp as heartbeats_blp


def register_api_blueprints(api):
    api.register_blueprint(heartbeats_blp)


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config["DEBUG"] = False
    app.config['API_TITLE'] = 'Round API'
    app.config['API_VERSION'] = 'v1'
    app.config['OPENAPI_VERSION'] = '3.0.3'
    app.config["JWT_SECRET_KEY"] = JWT_SECRET
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=10)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    JWTManager(app)
    api = Api(app)
    register_api_blueprints(api)
    return app