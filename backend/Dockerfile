FROM node:18

WORKDIR /usr/src/app

# Copie des manifests d'abord 
COPY package*.json ./

RUN npm install 

#DEBOG NEW
#RUN npm list --depth=0

# Copie du code
COPY . .

# Port interne 
ENV PORT=5050

EXPOSE 5050

CMD ["npm", "start"]
