CREATE TABLE contacts (
  contact_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  type ENUM('consulta', 'pedido') NOT NULL,
  preference VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  newsletter BOOLEAN DEFAULT FALSE
);
