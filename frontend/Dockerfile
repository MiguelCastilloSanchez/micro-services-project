# Establecer la imagen base
FROM node:14

# Crear y establecer el directorio de trabajo
WORKDIR /app

COPY package*.json ./
RUN npm install react-router-dom axios
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
RUN npm install jwt-decode
RUN npm install date-fns-tz
RUN npm install react-query

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]

