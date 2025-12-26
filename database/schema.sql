-- ECE Learning Ledger
-- Database schema
-- Author: Ahmed Ahmed
-- Created: 2025-12-26

CREATE DATABASE ece_learning_ledger;
USE ece_learning_ledger;

CREATE TABLE components (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category ENUM('passive', 'active') NOT NULL,
  symbol VARCHAR(10),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE circuits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  purpose TEXT,
  difficulty_level INT CHECK (difficulty_level BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE circuit_components (
  circuit_id INT NOT NULL,
  component_id INT NOT NULL,
  role VARCHAR(100),

  PRIMARY KEY (circuit_id, component_id),

  FOREIGN KEY (circuit_id)
    REFERENCES circuits(id)
    ON DELETE CASCADE,

  FOREIGN KEY (component_id)
    REFERENCES components(id)
    ON DELETE CASCADE
);


CREATE TABLE concepts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE circuit_concepts (
  circuit_id INT NOT NULL,
  concept_id INT NOT NULL,

  PRIMARY KEY (circuit_id, concept_id),

  FOREIGN KEY (circuit_id)
    REFERENCES circuits(id)
    ON DELETE CASCADE,

  FOREIGN KEY (concept_id)
    REFERENCES concepts(id)
    ON DELETE CASCADE
);

CREATE TABLE mistakes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  circuit_id INT NOT NULL,
  description TEXT NOT NULL,
  reason TEXT,
  fix TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (circuit_id)
    REFERENCES circuits(id)
    ON DELETE CASCADE
);
