FROM mileschou/lapis:alpine

WORKDIR /

COPY . .

RUN eval "$(luarocks path)"
RUN ./luarocks_install.sh

CMD ["lapis", "server"]
# CMD ["lua", "app.lua"]