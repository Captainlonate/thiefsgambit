# https://hub.docker.com/_/golang
# golang:<version>-alpine is "highly experimental",
# not supported by the go project,
# and does not include git, gcc, or bash.
# For that reason, this image will be used instead.
FROM golang:1.16

# Notes:
# To build a new image
#   docker build -t golang-slots-api .
# To Temporarily Run Once:
#   docker run -it --rm --name gambit-api -p "3001:3001" golang-slots-api

# The directory to cd to WITHIN the container
WORKDIR /go/src/app

COPY . .

# Install the module's dependencies
# -d means do not build or install packages
RUN go get -d -v ./...

# Install the executable within /go/bin, which is already
# included in the PATH (within the container)
RUN go install -v ./...

# The name of the go module in go.mod
CMD ["slotsserver"]