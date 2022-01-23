import marshmallow as ma


class TokenSchema(ma.Schema):
    token = ma.fields.String(required=True)


class CredentialsSchema(ma.Schema):
    token = ma.fields.String(required=True)
    refresh = ma.fields.String(required=True)


class LoginSchema(ma.Schema):
    email = ma.fields.Email(required=True)
