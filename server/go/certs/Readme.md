# Server Certs

This folder must contain a ssl.cert and ssl.key.

Using LetsEncrypt and Certbot:

`sudo amazon-linux-extras install epel`

`sudo yum install certbot`

`sudo certbot certonly`

_Places them in /etc/letsencrypt/live/<domain name you specified>/_

Rename:
- privkey.pem -> ssl.key
- fullchain.pem -> ssl.cert

_Stick em in this folder_

_Finally, they'll have to be renewed every 90 days. Instructions are in the README generated but it boils down to using a cron job to use certbot's renew command and two `cp` commands._

## Cert Renewal Script

#!/bin/bash

sudo certbot renew

# LETSENCRYPT SRC
KEY_SRC=/etc/letsencrypt/live/slotsapi.pirated.technology/privkey.pem
CERT_SRC=/etc/letsencrypt/live/slotsapi.pirated.technology/fullchain.pem

# GO API
CERT_DEST_GO=/home/ec2-user/gambit_github/thiefsgambit/server/go/certs/ssl.cert
KEY_DEST_GO=/home/ec2-user/gambit_github/thiefsgambit/server/go/certs/ssl.key

sudo cp $CERT_SRC $CERT_DEST_GO
sudo cp $KEY_SRC $KEY_DEST_GO
sudo chmod 644 $CERT_DEST_GO
sudo chmod 600 $KEY_DEST_GO

# NODE CHAT
CERT_DEST_NODE=/home/ec2-user/gambit_github/thiefsgambit/server/node/app/certs/ssl.cert
KEY_DEST_NODE=/home/ec2-user/gambit_github/thiefsgambit/server/node/app/certs/ssl.key

sudo cp $CERT_SRC $CERT_DEST_NODE
sudo cp $KEY_SRC $KEY_DEST_NODE
sudo chmod 644 $CERT_DEST_NODE
sudo chmod 600 $KEY_DEST_NODE

# Execute the two scripts to deploy chat and golang apis
/home/ec2-user/gambit_github/deploy_golang.sh
/home/ec2-user/gambit_github/deploy_chat.sh