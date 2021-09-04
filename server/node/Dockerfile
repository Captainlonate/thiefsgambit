# node:14 is almost 1 GB. 14-alpine is about 100MB
FROM node:14-alpine

ENV NODE_ENV=production

# The express server will listen on this port
# This handles docker-to-docker communication,
# which is probably not necessary in this case
EXPOSE 3002

# Create the /node directory to hold the entire project
WORKDIR /node

# These are separate steps so that layers will be formed
# It's more efficient to do this first, alone
COPY package*.json ./

# Create the app directory to hold the source code
# Make /node and all children owned by node
RUN mkdir app && chown -R node:node .

# Make all future RUN, ENTRY POINT, and CMD stanzas run as user node
USER node

# Install the dependencies (not dev dependencies) (again, as user node)
RUN npm install --production && npm cache clean --force

# Switch to this folder, it already exists and is owned by node
WORKDIR /node/app

# Copy the source code over, without the --chown, they'd be owned by root
COPY --chown=node:node . .

# Don't use npm start (according to Bret Fisher)
CMD ["node", "app"]