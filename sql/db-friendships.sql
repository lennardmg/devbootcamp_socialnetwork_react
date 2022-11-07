DROP TABLE IF EXISTS friendships CASCADE;

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON delete CASCADE,
    recipient_id INTEGER NOT NULL REFERENCES users(id) ON delete CASCADE,
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT current_timestamp
);