-- 1. Remove Order Products
DELETE FROM order_products
WHERE order_id IN (
    SELECT id FROM orders
    WHERE user_id IN (
        SELECT id FROM users
        WHERE first_name IN ('John', 'Jane', 'Alice', 'Bob')
    )
);

-- 2. Remove Orders
DELETE FROM orders
WHERE user_id IN (
    SELECT id FROM users
    WHERE first_name IN ('John', 'Jane', 'Alice', 'Bob')
);

-- 3. Remove Products in the categories we want to delete
DELETE FROM products
WHERE category_id IN (
    SELECT id FROM categories
    WHERE name IN ('Electronics', 'Books', 'Clothing', 'Home & Kitchen')
);

-- 4. Remove Categories
DELETE FROM categories
WHERE name IN ('Electronics', 'Books', 'Clothing', 'Home & Kitchen');

-- 5. Remove Users
DELETE FROM users
WHERE first_name IN ('John', 'Jane', 'Alice', 'Bob');
