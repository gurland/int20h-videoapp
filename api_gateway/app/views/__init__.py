from flask import jsonify
from flask.views import MethodView
from flask_smorest import Blueprint

blp = Blueprint(
    'index', __name__, url_prefix='/',
    description='Heartbeat endpoints'
)


@blp.route('/')
class Heartbeats(MethodView):
    @blp.response(200)
    def get(self):
        return jsonify({"message": "Everything is ok!"})
