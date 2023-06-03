# 50amigos


## Description

La aplicación móvil 50amigos Restaurant es fácil de usar y está diseñada para mejorar la experiencia gastronómica en nuestro restaurante. Con esta app, los clientes pueden ver cómodamente nuestro menú, explorar diversos platos y bebidas, y realizar pedidos directamente desde sus dispositivos móviles. Nuestro objetivo es brindar una forma fluida y eficiente para que los clientes interactúen con nuestro restaurante, permitiéndoles ordenar sus ítems favoritos de manera fácil y conveniente.

The 50amigos Restaurant App is a user-friendly application designed to enhance the dining experience at our restaurant. With this app, customers can conveniently view our menu, explore various dishes and beverages, and place orders directly from a mobile devices. Our aim is to provide a seamless and efficient way for customers to engage with our restaurant, enabling them to order their favorite items with ease and convenience.

## Requirements
- Node v19.9.0
- sqlite3

## Instalation

This application employs a distributed architecture with two servers. The backend is powered by Express.js, while the frontend utilizes Nuxt 3. This setup allows for efficient development, performance optimization, and a seamless user experience.

### Backend

Before running the application, it is necessary to set up the environment variables in order to start the app. Here's an example of such variables:

```bash
PORT=8000
SESSION_DURATION=1y
TOKEN_SECRET=b4af89faff7d8d53d72ff389f5cbd3ade26338441c3efe0366da729b7e9b4e8d
DATABASE_URL=file:./dev.db
```

Then, run the following scripts, in the directory `./amigos-app`:
```bash
npm run install
npm run build
npm run start
```

### Frontend
First, you need to declare an enviroment variable. If it's not specified, the default is the `http://localhost:8000`:

```bash
API_BASE_URL=http://localhost:8000
```

Then, goes to the directory `./amigos-front` and install the npm dependencies. After that, build the app for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Contributors

- [Alex Nakamura](https://github.com/AlexNakamuraDF)
- [Noé Suaste](https://github.com/noe-suaste)
- [Juan Juárez](https://github.com/Juan13Ju)
- [Diego Méndez](https://github.com/DiegoMendezMedina)
- [Luis Onofre](https://github.com/lonofre)