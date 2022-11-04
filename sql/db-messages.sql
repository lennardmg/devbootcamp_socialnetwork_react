DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    recipient_id INTEGER,
    message TEXT,
    created_at TIMESTAMP DEFAULT current_timestamp
);

INSERT INTO messages (sender_id, message) VALUES ('50', 'This is a test message'), ('49', 'I also would like to send a test message');