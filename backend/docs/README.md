# Documentación de la API

## URL base

[http://localhost:3000/api](http://localhost:3000/api)

## Endpoints de documentos

| Método | Ruta         | Descripción                  | Auth |
| ------ | ------------ | ---------------------------- | ---- |
| GET    | `/lista`     | Obtiene todos los documentos | No   |
| GET    | `/lista/:id` | Obtiene un producto por ID   | No   |
| POST   | `/lista`     | Crea un producto             | Sí   |
| PUT    | `/lista/:id` | Actualiza un producto        | Sí   |
| DELETE | `/lista/:id` | Elimina un producto          | Sí   |

## Ejemplo de creación de documentos

{

"title": "Título",

"subtitle": "Subtítulo del documento",

"body": "Aquí vas el cuerpo del documento/noticia",

"status": "pendiente"

}

## Cómo probar la API

1. Instala la extensión REST Client en VSCode.
2. Abre el archivo `docs/api.http`.
3. Pulsa en `Send Request` encima de cada petición.
4. Observa la respuesta devuelta por el servidor.
