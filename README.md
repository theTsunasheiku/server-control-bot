# Server Control Discord Bot

This bot can call AWS lambda enpoints.

## Installation

1. clone the repo
2. cd into new dir
3. cp .env.template .env
4. edit the new .env with your data
5. call ./install.sh

## Check Systemd

after installation check if the service has successfuly started

```sh
sudo systemctl status server-control-bot.service
```

TODO OPTIMIZE README