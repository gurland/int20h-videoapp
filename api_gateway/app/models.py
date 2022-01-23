from app.settings import *

from datetime import datetime
import uuid

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker


POSTGRES_URI = (
    f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/"
    f"{DB_NAME}"
)

engine = create_engine(POSTGRES_URI, echo=True)
Session = sessionmaker(autoflush=False, bind=engine)
session = scoped_session(Session)
Base = declarative_base()
Base.query = session.query_property()


from peewee import PostgresqlDatabase, IntegerField, CharField, DateField, BooleanField, TextField, ForeignKeyField, UUIDField, DecimalField, TimeField, DateTimeField
from playhouse.signals import Model, post_save
from passlib.hash import bcrypt
from flask_jwt_extended import create_access_token


database = PostgresqlDatabase(DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT, autorollback=True, autoconnect=True)


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




class Room(BaseModel):
    uuid = UUIDField(primary_key=True, default=uuid.uuid4)
    created_at = DateTimeField(default=datetime.utcnow)

    name = CharField()
    description = CharField(null=True)
    public = BooleanField(default=True)

    creator = ForeignKeyField(User, backref="rooms")

    def to_dict(self):
        participants = [participant.participant for participant in RoomParticipant.select().where(RoomParticipant.room == self)]

        return {
            "uuid": self.uuid,
            "name": self.name,
            "description": self.name,
            "creator": self.creator.to_dict(),
            "participants": [participant.to_dict() for participant in participants]
        }


class RoomParticipant(BaseModel):
    room = ForeignKeyField(Room, backref="room_participants")
    participant = ForeignKeyField(User, backref="room_participants")


database.create_tables([
    User,
    File,
    Room,
    RoomParticipant
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
