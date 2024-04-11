# Decisiones de diseño de la app

## Use cases

- Crear usuarios/as (**CreateUserCommand**)
- Crear vendedores (**CreateVendorCommand**)
- Crear productos (**CreateProductCommand**)
- Eliminar productos (**DeleteProductCommand**)
- Editar productos (**EditUserCommand**)
- Buscar productos por nombre y categoría (**SearchProductQuery**)
- Filtrar productos por precio (**FilterProductsQuery**)
- Procesar la venta de un producto (**ProcessSaleCommand**)

## El diseño con DDD

### Ubiquitous Language: Usuario, vendedor, producto, venta


### Entities

- User
  - ID
  - name
  - lastname
  - email
- Seller
  - Name
  - email
  - List of products
- Product
  - id
  - name
  - description
  - price
  - sku
  - sellerId
- Item
  - amount
  - productId
- Sale
  - date
  - List of Item

### Aggregates

#### User aggregate
Contains User and Seller entities

#### Product aggregate

Contains products, sale and Item entities

