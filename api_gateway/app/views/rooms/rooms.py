import logging

from app.models import User, Room, RoomParticipant, database
from app.schemes.rooms import RoomSchema

from flask import jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

blp = Blueprint(
    'rooms', __name__, url_prefix='/rooms',
    description='Upload files endpoints'
)

@blp.route('/')
class Rooms(MethodView):

    @blp.response(200)
    @jwt_required()
    def get(self):
        with database.atomic() as trx:
            rooms = Room.select().where(Room.public==True)
            result = []
            for room in rooms:
                result.append(room.to_dict())
            return jsonify(result)

    @blp.arguments(RoomSchema, location='json')
    @blp.response(200)
    @jwt_required()
    def post(self, register_data):
        with database.atomic() as trx:
            identity = get_jwt_identity()

            try:
                current_user = User.get(login=identity.get("login"))
            except User.DoesNotExist:
                return jsonify({"message": "Malformed request"}), 400

            try:
                room = Room.create(
                    name=register_data.get("name"),
                    description=register_data.get("description"),
                    public=register_data.get("public"),
                    creator=current_user
                )

                return jsonify({"message": f"Successfully created room with ID: {room.uuid}", "roomId": room.uuid}), 200

            except:
                return jsonify({"message": "Malformed request!"}), 400


@blp.route('/<room_id>')
class RoomByUUID(MethodView):

    @blp.response(200)
    @jwt_required()
    def get(self, room_id):
        with database.atomic() as trx:
            identity = get_jwt_identity()

            try:
                current_user = User.get(login=identity.get("login"))
            except User.DoesNotExist:
                return jsonify({"message": "Malformed request"}), 400

            try:
                requested_room = Room.get(uuid=room_id)
            except Room.DoesNotExist:
                return jsonify({"message": "Room does not exist"}), 404

            if current_user not in (room_participant.participant for room_participant in requested_room.room_participants):
                return jsonify({"message": "User has no access to the room"}), 400
            else:
                return jsonify(requested_room.to_dict())

    @blp.arguments(RoomSchema, location='json')
    @blp.response(200)
    @jwt_required()
    def put(self, new_data, room_id):
        with database.atomic() as trx:
            identity = get_jwt_identity()

            try:
                current_user = User.get(login=identity.get("login"))
            except User.DoesNotExist:
                return jsonify({"message": "User does not exist"}), 400

            try:
                requested_room = Room.get(uuid=room_id)
                if current_user != requested_room.creator:
                    return jsonify({"message": "You don't have rights to edit the room"}), 404
            except Room.DoesNotExist:
                return jsonify({"message": "Room does not exist"}), 404

            new_name = new_data.get("name")
            if new_name:
                requested_room.name = new_name
                requested_room.save()

            new_description = new_data.get("description")
            if new_description:
                requested_room.description = new_description
                requested_room.save()

            return jsonify({"message": "Edit successful"}), 200


@blp.route('/<room_id>/participants')
class RoomByUUIDParticipants(MethodView):

    @blp.response(200)
    @jwt_required()
    def get(self, room_id):
        with database.atomic() as trx:
            identity = get_jwt_identity()

            try:
                current_user = User.get(login=identity.get("login"))
            except User.DoesNotExist:
                return jsonify({"message": "Malformed request"}), 400

            try:
                logging.error(room_id)
                logging.error(room_id)
                logging.error(room_id)

                requested_room = Room.get(uuid=room_id)
            except Room.DoesNotExist:
                return jsonify({"message": "Room does not exist"}), 404

            room_participants = (room_participant.participant for room_participant in requested_room.room_participants)
            if current_user not in room_participants:
                return jsonify({"message": "User has no access to the room"}), 400
            else:
                return jsonify([room_participant.to_dict() for room_participant in room_participants])

    @blp.response(200)
    @jwt_required()
    def post(self, room_id):
        with database.atomic() as trx:
            identity = get_jwt_identity()

            try:
                current_user = User.get(login=identity.get("login"))
            except User.DoesNotExist:
                return jsonify({"message": "Malformed request"}), 400

            try:
                requested_room = Room.get(uuid=room_id)
            except Room.DoesNotExist:
                return jsonify({"message": "Room does not exist"}), 404

            room_participants = (room_participant.participant for room_participant in requested_room.room_participants)
            if current_user in room_participants:
                return jsonify({"message": "User is already a participant"}), 409
            else:
                RoomParticipant.create(
                    room=requested_room,
                    participant=current_user
                )
                return jsonify({"message": "You have joined the room"}), 200


@blp.route('/<room_id>/participants/<int:participant_id>')
class RoomByUUIDParticipantsById(MethodView):
    @blp.response(200)
    @jwt_required()
    def delete(self, room_id, participant_id):
        with database.atomic() as trx:
            identity = get_jwt_identity()

            try:
                current_user = User.get(id=identity.get("id"))
                participant_to_remove = User.get(id=participant_id)
            except User.DoesNotExist:
                return jsonify({"message": "User does not exist"}), 400

            try:
                requested_room = Room.get(uuid=room_id)
                logging.error("=======================")
                logging.error(room_id)
                logging.error(participant_to_remove.id)
                logging.error(current_user.id)

                if current_user.id == requested_room.creator.id:
                    is_kicked = RoomParticipant.kick_participant(requested_room, participant_id)
                elif current_user.id == participant_to_remove.id:
                    is_kicked = RoomParticipant.kick_participant(requested_room, participant_id)
                else:
                    return jsonify({"message": "You don't have rights to kick other participants"}), 400

                if is_kicked:
                    return jsonify({"message": "User was kicked"}), 200
                else:
                    return jsonify({"message": "User was not participant anymore"}), 404
            except Room.DoesNotExist:
                return jsonify({"message": "Room does not exist"}), 404
