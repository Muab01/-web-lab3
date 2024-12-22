CREATE TABLE Menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Cart (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE CartItems (
    id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES Cart(id) ON DELETE CASCADE,
    menu_id INT REFERENCES Menu(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0)
);


CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_contact VARCHAR(100) NOT NULL,
    pickup_or_dine_in VARCHAR(10) CHECK (pickup_or_dine_in IN ('Pickup', 'Dine-In')) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE OrderItems (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(id) ON DELETE CASCADE,
    menu_id INT REFERENCES Menu(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL
);


INSERT INTO Menu (name, description, price, image_url) VALUES
('Spaghetti Bolognese', 'Classic spaghetti with meat sauce', 12.00, '/images/bolognese.jpg'), 
('Lasagna', 'Layered pasta with meat, tomato sauce, and cheese', 15.00, '/images/lasagna.jpg'),
('Pasta Carbonara', 'Pasta with eggs, cheese, pancetta, and black pepper', 13.00, '/images/carbonara.jpg'), 
('Fettuccine Alfredo', 'Fettuccine pasta with creamy parmesan and butter sauce', 14.00, '/images/fettuccine.jpg'), 
('Penne Arrabbiata', 'Penne pasta with spicy tomato and garlic sauce', 11.00, '/images/penne.jpg'), 
('Ravioli', 'Stuffed pasta with ricotta and spinach filling, served with tomato sauce', 16.00, '/images/ravioli.jpg'), 
('Tortellini', 'Ring-shaped pasta stuffed with cheese and served in broth or sauce', 15.50, '/images/tortellini.jpg'), 
('Gnocchi', 'Soft dumpling-like pasta made from potatoes, served with pesto sauce', 13.50, '/images/gnocchi.jpg');


