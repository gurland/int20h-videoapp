FROM debian:latest

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y libmicrohttpd-dev libjansson-dev libnice-dev libssl-dev libsrtp2-dev libsofia-sip-ua-dev libglib2.0-dev libopus-dev libogg-dev libini-config-dev libcollection-dev libwebsockets-dev pkg-config gengetopt automake libtool doxygen graphviz git cmake libconfig-dev

RUN git clone https://github.com/meetecho/janus-gateway

WORKDIR janus-gateway

RUN sh autogen.sh && sh configure --prefix=/opt/janus

RUN make && make install && make configs

EXPOSE 8088
EXPOSE 8188

CMD ["/opt/janus/bin/janus"]
