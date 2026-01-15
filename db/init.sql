-- db/init.sql
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insérer des données de test
INSERT INTO messages (content) VALUES 
    ('Hello from AWS ECS! 🚀'),
    ('Application 3-tiers déployée avec succès!'),
    ('Backend connecté à PostgreSQL via RDS');