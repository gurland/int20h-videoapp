import marshmallow as ma


class FileQueryArgs(ma.Schema):
    name = ma.fields.String()
