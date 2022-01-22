import marshmallow as ma


class RegisterSchema(ma.Schema):
    login = ma.fields.String(required=True)
    password = ma.fields.String(required=True)
    profile_picture = ma.fields.String(required=False, data_key="profilePicture")


class EditUserSchema(ma.Schema):
    profile_name = ma.fields.String(required=False, data_key="profileName")
    profile_picture = ma.fields.String(required=False, data_key="profilePicture")
