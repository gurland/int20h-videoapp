FROM debian:latest

FROM debian:latest

RUN apt-get update && apt-get upgrade -y

RUN apt install -y libmicrohttpd-dev libjansson-dev libnice-dev libssl-dev libsrtp2-dev libsofia-sip-ua-dev libglib2.0-dev libopus-dev libogg-dev libini-config-dev libcollection-dev libwebsockets-dev pkg-config gengetopt automake libtool git cmake libconfig-dev liblua5.3-dev meson

RUN git clone https://gitlab.freedesktop.org/libnice/libnice

WORKDIR /libnice

RUN meson --prefix=/usr build && ninja -C build && ninja -C build install

WORKDIR /

RUN git clone https://github.com/meetecho/janus-gateway

WORKDIR /janus-gateway

RUN sh autogen.sh && sh configure --prefix=/opt/janus

RUN make && make install && make

EXPOSE 8088
EXPOSE 8188

CMD ["/opt/janus/bin/janus"]
