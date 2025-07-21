#FROM node:18
#pour mon mac M3 , lautre etait intel 
FROM --platform=linux/arm64 node:18 


WORKDIR /usr/src/app

# Copie des manifests d'abord (caching des installs)
COPY package*.json ./

RUN npm install 

#DEBOG NEW
#RUN npm list --depth=0

# Copie du code
COPY . .

# Port interne (doit matcher le PORT utilisé par app.js)
ENV PORT=5050

EXPOSE 5050

CMD ["npm", "start"]
