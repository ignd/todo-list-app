# infrastructure/Dockerfile
FROM node:18

WORKDIR /app

# Copie uniquement les fichiers nécessaires à npm install
COPY ../client/package*.json ./

RUN npm install

# Copie le reste du code
COPY ../client ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]