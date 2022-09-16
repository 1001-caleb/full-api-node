# Full API e-ccomerce
[![Test for my API](https://github.com/1001-caleb/full-api-node/actions/workflows/test.yml/badge.svg)](https://github.com/1001-caleb/full-api-node/actions/workflows/test.yml)

API REST server completa. 



## Pre requisitos
- Node.js v16
- npm v8
- Archivo `.env` que luzca como `.env.example`
- Docker (opcional)
## Instalación
Instala las dependencias de este proyecto:
```bash
    npm i
```
## Uso


### Sin Docker
Para correr el servidor en modo de desarrollo, usa:
```bash
    npm run express
```

### Con docker
1. Hacemos build de la imagen de Docker
```bash
    docker build -f Dockerfile.local -t full-api:1
```

2. Creamos y corremos el contenedor a partir de la imagen creada:
```bash
    docker start -p3000:2000 --name name 
```

## Autor

parra.code