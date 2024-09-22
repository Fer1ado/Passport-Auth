

 
<h4  style="text-align:center" >crear archivo .env con variable DB_CNN = {stringconnect de mongo}</h4> 
<h4  style="text-align:center" > <font color="red">npm start</font> para levantar el servidor </h4>
<h5  style="text-align:center" > para poblar la DB como primer comando ingresar desde postman a la ruta POST: <br> <font color="blue">localhost:8080/api/products/many</font> </h5> 


---
<h3  style="text-align:center" >----> TESTING <---</h3> 

<br> 
<br>


| METODO             | RUTA | DESCRIPCION | COMMENTARIOS
| :---------------- | :------: | :------: | :------: |
| GET       |   localhost:8080/api/products/:pid   | busqueda de productos en carrito por ID | TESTING POSTMAN |
| GET POST            |    localhost:8080/api/products    | listar y agregar productos a la BD  | TESTING POSTMAN implemente una validación de datos por campo para que no se incluyan items incompletos a la DB |
| POST  |  localhost:8080/api/products/many    |  ruta de inserción masiva de productos a la BD | TESTING POSTMAN |
| PUT DELETE   |  localhost:8080/api/products/:id    | rutas de modificación y eliminación de products de la BD | TESTING POSTMAN implemente una validación por campos para mantener formato de registro en la DB|
| GET PUT DELETE |  localhost:8080/api/cart/:cid   | rutas de busqueda, edicion por array de productos y eliminación de carrito en la BD | Edición por array tiene que ser con el siguiente formato [{product: id, quantity: Intg},{},{}... todos los prods TESTING POSTMAN |]
| GET POST |  /api/cart   | ruta de busqueda y creación de carritos | TESTING POSTMAN la busqueda de carrito con cart ID viene con populate de productos |
| POST PUT DELETE  |  localhost:8080/api/cart/:cid/product/:pid   |  rutas de busqueda edicion y creación de productos dentro de carrito especifico en la BD | TESTING POSTMAN |
| GET |  localhost:8080/home     | ruta view de home Handlebars | TESTING NAVEGADOR/HANDLEBARS |
| GET |  localhost:8080/products  | ruta view de products con mongoose-paginate y sorting por precio y stock| TESTING NAVEGADOR/HANDLEBARS |
| POST |  localhost:8080/products/api/cart/:cid/product/:pid   | vista de carrito con agregado de productos | TESTING NAVEGADOR/HANDLEBARS hay que navegar con flechas de navegador para cargar productos en el mismo carrito si se actualiza la pagina el comportamiento por default es crear un nuevo cart  |
| POST |  localhost:8080/products/api/cart/:cid/product/delete/:pid   | endpoint que linkea view de carrito con la eliminacion de productos  | TESTING NAVEGADOR/HANDLEBARS |
| GET |  localhost:8080/cart/:cid  | ruta view de carrito en Handlebars | TESTING NAVEGADOR/HANDLEBARS |

<br>
<br>

