# Thief's Gambit - API

## My notes:

```bash
# Manually running golang on the postgres's network without docker-compose
docker run -it --rm --network=gambit_gambit_network --name=gambit_api_container -p "3001:3001" gambit_api_image
```

_Some of my aliases on the server in .bashrc_

```bash
# View stack logs (alias is gambitlogs)
docker-compose -f ~/gambit/stack.yml logs
# Restart the stack (alias is gambitup)
docker-compose -f ~/gambit/stack.yml up -d
# Build a new golang image (alias is buildapi)
docker build -t gambit_api_image --quiet --no-cache ~/gambit_github/thiefsgambit/server/go/
# Better formatted docker container ls (alias is docklist)
docker container ls -a --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Networks}}"
```