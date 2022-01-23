import marshmallow as ma


class RoomSchema(ma.Schema):
    name = ma.fields.String(required=True)
    description = ma.fields.String(required=False)
    public = ma.fields.Boolean(default=True)
