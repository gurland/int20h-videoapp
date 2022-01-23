from app.settings import *

from peewee import PostgresqlDatabase, IntegerField, CharField, DateField, BooleanField, TextField, ForeignKeyField, UUIDField, DecimalField, TimeField, DateTimeField
from playhouse.signals import Model, post_save
from passlib.hash import bcrypt
from flask_jwt_extended import create_access_token


database = PostgresqlDatabase(DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT, autorollback=True)


class BaseModel(Model):
    class Meta:
        database = database


class File(BaseModel):
    path = CharField()
    filename = CharField(null=True)

    def to_dict(self):
        return {
            "path": self.path,
            "filename": self.filename
        }


class User(BaseModel):
    login = CharField(unique=True)
    password_hash = CharField()
    profile_name = CharField()
    profile_picture = ForeignKeyField(File, backref="users", null=True)

    @classmethod
    def get_user_by_login(cls, login):
        if login:
            return cls.get(login=login)

    def to_dict(self):
        response_dict = {
            "id": self.id,
            "login": self.login,
            "profileName": self.profile_name,
        }

        if self.profile_picture:
            response_dict["profilePicture"] = self.profile_picture.path

        return response_dict

    def verify_password(self, plain_password):
        return bcrypt.verify(plain_password, self.password_hash)

    def create_jwt_token(self):
        token_payload = {"id": self.id, "login": self.login, "profile_name": self.profile_name}
        return create_access_token(token_payload)


database.create_tables([
    User,
    File
], safe=True)

test_users = [
    dict(
        login="admin",
        password_hash=bcrypt.hash("qweqweqwe"),
        profile_name='admin'
    ),
]

for user in test_users:
    try:
        User.get_or_create(**user)
    except:
        pass
