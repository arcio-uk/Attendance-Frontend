FROM node:16.13.2

WORKDIR /app

COPY . /app

RUN echo "VITE_AUTH_BACKEND_URL=http://localhost:5000" > .env
RUN echo "VITE_ATTENDANCE_BACKEND_URL=http://localhost:8010" >> .env
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev"]
