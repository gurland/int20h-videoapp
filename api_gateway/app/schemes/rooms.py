import marshmallow as ma


class RoomSchema(ma.Schema):
    name = ma.fields.String(required=True)
    description = ma.fields.String(required=False)
    public = ma.fields.Boolean(default=True)


class RemoveParticipantSchema(ma.Schema):
    participant_id = ma.fields.Integer(required=True, data_key="participantId")
