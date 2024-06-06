# Usar una imagen base oficial de Node.js
FROM node:14

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar los archivos de package y package-lock primero para aprovechar el caché
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir el proyecto (si estás usando TypeScript)
RUN npm run build

# Exponer el puerto que la aplicación va a utilizar
EXPOSE 4000

# Establecer variables de entorno
ENV PORT=4000

# Comando para ejecutar las migraciones y luego iniciar la aplicación
CMD ["npm", "run", "poststart"]
