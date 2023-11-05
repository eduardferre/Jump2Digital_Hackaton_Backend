-- DB Creation
CREATE DATABASE skinsdb

-- Use DB
USE skinsdb

-- Create Skins Table
CREATE TABLE skins (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(255) NOT NULL,
    owner VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    price FLOAT,
    color VARCHAR(255) NOT NULL,
    available BOOLEAN
)