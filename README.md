# Video Application
Repository for INT20H 2022 test task made by `U+200F` team.
Create rooms, with text, video and audio chats.

## Demo
[Live version of website](https://int20h-videoapp.fun/)

![Main page](https://i.imgur.com/uTJXnOf.png)
![Video and Chat Room](https://i.imgur.com/UDEVlSU.png)

## Features
- Single Page Application
- Material design
- Kick users as creator
- Text chat
- Profile avatars & room descriptions
- Copy private room URL just from your adress bar!

## Technology stack
- Python + Flask + Smorest + Peewee
- Socket.io + Node.JS + MongoDB
- React.js + Material Ui
- Docker + Docker Compose
- Nginx

## How to run

### Prerequisite
1. Install [Docker](https://docs.docker.com/get-docker/)
2. Install [Docker-compose](https://docs.docker.com/compose/install/)
3. Optional: install SSL certificate for your server using certbot + change server_name to your domain name

If you omit step 3 please remove all files inside nginx_service/block_configs and copy videoapp-nossl.conf there

### Download & Run
```sh
git clone https://github.com/gurland/int20h-videoapp.git
cd goods-aggregator
docker-compose up --build
```

## Contributors

- [Stanislav Bobokalo](https://github.com/gurland/)

- [Oleksandr Semeniuk](https://github.com/dvoyakiy)

- [Roman Matuk](https://github.com/r666666)

- [Kostiantyn Pasalskyi](https://github.com/kiririnou)


## License
[GPL-3.0 License](https://github.com/gurland/int20h-videoapp/blob/main/LICENSE)
