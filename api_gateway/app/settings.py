import os

JWT_SECRET = os.getenv("JWT_SECRET", "secret")

DB_NAME = os.getenv("DB_NAME", "postgres")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "testpassword1234")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")


S3_BUCKET = os.getenv("S3_BUCKET", "videoapp-files")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "")
AWS_ACCESS_SECRET_KEY = os.getenv("AWS_ACCESS_SECRET_KEY", "")
