# Establecer la imagen base
FROM node:14

# Crear y establecer el directorio de trabajo
WORKDIR /app

COPY package*.json ./
RUN npm install react-router-dom axios
COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]

