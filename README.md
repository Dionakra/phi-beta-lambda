# Comedia Perpetua - Phi Beta Lambda
Web no oficial sobre el programa de radio de **Cadena SER** en la que se muestran pormenorizados los contenidos de comedia (cómic@s, especiales, series, programas, podcasts y películas) referenciados en el programa, creando un índice de cómic@s, sus menciones, contenidos destacados y cualquier contenido multimedia del que se hable en los programas.

## Desarrollo
### Prerequisitos
* NodeJS LTS

### Instalación
```sh
git clone https://github.com/Dionakra/cope.git
cd cope
npm install
```

### Desarrollo
```sh
# La web estará disponible desde http://localhost:3000
npm run dev
```

La *base de datos* tiene dos partes diferenciadas:
* **Ficheros fuente:** Localizados en `static/db`. Contiene la información pormenorizada de programas, cómicos, secciones, presentadores, y contenidos multimedia. Los contenidos de la web no se leen directamente de aquí, esta base de datos sirve como herramienta de control *sencilla* de la información.
* **Ficheros API:** Los ficheros que realmente se consumen están en `static/api`, los cuales son generados en base a los ficheros de la BD en `static/db`. Para ello, ejecuta el siguiente comando, el cual generará los ficheros necesarios para ser consumidos por la web:
```sh
cd lib
node build-api.js
```
Por lo tanto, si se va a añadir información a la web, se deben editar los ficheros en `static/db` y generar el contenido con `lib/build-api.js`

### Despliegue
Actualmente el proyecto está configurado para ser desplegado en Firebase, concretamente en un proyecto con tres *mirrors*. Para ello, ejecutar los siguientes comandos:

```sh
cd lib
node build-api.js
cd ..
npm run build
firebase deploy
```
## Stack Tecnológico.
Esta web ha sido desarrollada con las siguientes tecnologías:
* [Vue.js](https://vuejs.org/)
* [Nuxt.js](https://nuxtjs.org/)
* [TailwindCSS](https://tailwindcss.com/)
