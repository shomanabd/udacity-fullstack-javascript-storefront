# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### RESTful Routes

#### Products

- `GET /products` - Index (List all products)
- `GET /products/:id` - Show (Get a specific product by ID)
- `POST /products` - Create [token required] (Create a new product)
- `GET /products/top-five-popular` - [OPTIONAL] Top 5 most popular products
- `GET /products/category/:category_id` - [OPTIONAL] Products by category

#### Users

- `GET /users` - Index [token required] (List all users)
- `GET /users/:id` - Show [token required] (Get a specific user by ID)
- `POST /users` - Create (Create a new user - returns JWT token)

#### Orders

- `GET /orders/current/:user_id` - Current Order by user [token required]
- `GET /orders/completed/:user_id` - [OPTIONAL] Completed Orders by user [token required]
- `POST /orders` - Create order [token required]
- `POST /orders/:id/products` - Add products to order [token required]
- `PUT /orders/:id` - Update order status [token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema

### Tables

#### categories

- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(100) UNIQUE NOT NULL

#### products

- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(100) NOT NULL
- `price` NUMERIC(10, 2) NOT NULL DEFAULT 0.00
- `category_id` INTEGER REFERENCES categories(id)

#### users

- `id` SERIAL PRIMARY KEY
- `first_name` VARCHAR(100) NOT NULL
- `last_name` VARCHAR(100) NOT NULL
- `password_digest` VARCHAR(256) NOT NULL

#### orders

- `id` SERIAL PRIMARY KEY
- `user_id` INTEGER REFERENCES users(id)
- `status` order_status NOT NULL DEFAULT 'active'

Note: `order_status` is an ENUM type with values: 'active', 'complete'

#### order_products

- `id` SERIAL PRIMARY KEY
- `order_id` INTEGER REFERENCES orders(id)
- `product_id` INTEGER REFERENCES products(id)
- `quantity` INTEGER NOT NULL
- UNIQUE(order_id, product_id)
