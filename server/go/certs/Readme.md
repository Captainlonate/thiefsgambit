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