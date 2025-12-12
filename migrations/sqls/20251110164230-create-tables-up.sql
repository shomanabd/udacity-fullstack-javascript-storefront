
-- Create Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name varchar(100) UNIQUE NOT NULL
);

-- Create Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    price numeric(10, 2) NOT NULL DEFAULT 0.00,
    category_id INTEGER REFERENCES categories(id)
);

-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    password_digest varchar(256) NOT NULL
);

-- create Order Status Type and Orders Table
CREATE TYPE order_status AS ENUM ('active', 'complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status order_status NOT NULL DEFAULT 'active'
);

-- Create Order_Products Table
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    UNIQUE(order_id, product_id)
);



