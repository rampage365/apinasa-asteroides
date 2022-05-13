<<<<<<< HEAD
# apinasa-asteroides
=======
# Portal de Asteroides

## En que consiste la aplicacion
Obtener una lista de los asteroides mas cercanos a la tierra en una fecha dada, luego con esa informacion filtrar los asteroides peligrosos para el planeta tierra y hacer un CRUD de forma local con dicha informacion.

## Stack Tecnológico 
### Front End Technologies
CSS,
HTML y
JS

### Back End Technologies
NODE.js

## Documentacion de la APP
Para acceder a las funciones del API, es necesario un APIKEY, por lo cual debes crear una cuenta en https://api.nasa.gov/.

### Endpoints API
Debido a el API te devuelbe una lista de asteroides sin una propiedad que contenga el valor que indique que es peligroso o no, hacemos uso de 2 ENDPOINTS.

#### ENDPOINT #1
A travez de este primer ENDPOINT se obtiene una lista de los asteroides cercanos a la tierra, entre 25 fechas que el usuario ingresa, dichas fechas no deben tener más de 7 dias de diferencia, ya que ese un parametro establecido del API.

```http
  GET https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${keyAPI}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `startDate`      | `date yyyy-mm-dd` | **Required**. Fecha inicial |
| `end_date`      | `date yyyy-mm-dd` | **Required**. Fecha final |
| `keyAPI`      | `string` | **Required**. Llave de acceso para obtener informacion del API |

La informacion obtenida en formato JSON contiene las caracteristicas de los asteroides, como fecha de avistamiento, diametro, proxima fecha de avistamiento, etc.

Pero no contiene la informacion o dato que nos indique si es peligroso para el planeta tierra o no, dicha informacion la obtendremos a travez de otro ENDPOINT el cual es el #2.


#### ENDPOINT #2
A travez de este segundo ENDPOINT se obtiene un JSON con el cual el cual en el campo is_potentially_hazardous_asteroid nos indica si es peligroso o no.

```http
  GET https://api.nasa.gov/neo/rest/v1/neo/${idAsteroide}?api_key=${keyAPI}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `idAsteroide`      | `string` | **Required**. id del asteroide obtenido a travez del primer ENDPOINT |
| `keyAPI`      | `string` | **Required**. Llave de acceso para obtener informacion del API |

Una vez obtenida dicha informacion la almacenamos en un array de objetos y podemos realizar un CRUD de manera LOCAL
>>>>>>> b0e7826 (add: first commit)
