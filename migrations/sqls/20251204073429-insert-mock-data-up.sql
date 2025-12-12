-- Users
INSERT INTO users (first_name, last_name, password_digest) VALUES
('John', 'Doe', 'password123'),
('Jane', 'Smith', 'securepass'),
('Alice', 'Johnson', 'alicepwd'),
('Bob', 'Brown', 'bobsecure');

-- Categories
INSERT INTO categories (name) VALUES
('Electronics'),
('Books'),
('Clothing'),
('Home & Kitchen');

-- Products
INSERT INTO products (name, price, category_id) VALUES
('Smartphone', 699.99, 1),
('Laptop', 999.99, 1),
('Novel', 19.99, 2),
('T-Shirt', 14.99, 3),
('Blender', 49.99, 4),
('Headphones', 89.99, 1),
('Cookbook', 24.99, 2),
('Jeans', 39.99, 3),
('Coffee Maker', 79.99, 4);

-- Orders
INSERT INTO orders (user_id, status) VALUES
(1, 'active'),
(2, 'complete'),
(3, 'active'),
(4, 'complete'),
(1, 'complete');

-- Order Products
INSERT INTO order_products (order_id, product_id, quantity) VALUES
(1, 1, 1),
(1, 4, 2),
(2, 2, 1),
(2, 3, 1),
(3, 5, 1),
(4, 6, 2),
(4, 7, 1),
(3, 8, 1),
(1, 9, 1),
(5, 1, 1);
