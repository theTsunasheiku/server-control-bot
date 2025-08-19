#!/bin/bash

# create bot user
adduser discordbot

# create dir at /opt
sudo mkdir /opt/server-control-bot
# copy content of this dir into new created dir
sudo cp -r . /opt/server-control-bot

# copy service file to systemd
sudo cp server-control-bot.service /etc/systemd/system/server-control-bot.service

# chown for discordbot user on /opt/server-control-bot
chown -R discordbot:discordbot /opt/server-control-bot

# create systemd to run bot in background and reboot
sudo systemctl daemon-reload
sudo systemctl enable server-control-bot.service
sudo systemctl start server-control-bot.service