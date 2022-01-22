db.createUser(
    {
        user: "root",
        pwd: "supersecretpass",
        roles: [
            {
                role: "readWrite",
                db: "chats"
            },
            {
                role: "readWrite",
                db: "notifications"
            }
        ]
    }
);
