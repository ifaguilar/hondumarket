CREATE TABLE Person_Role(
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
);

CREATE TABLE Rating(
    id SERIAL PRIMARY KEY,
    rating_value INT NOT NULL
);

CREATE TABLE Condition(
    id SERIAL PRIMARY KEY,
    condition_name VARCHAR(255) NOT NULL
);

CREATE TABLE Department(
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

CREATE TABLE Municipality(
    id SERIAL PRIMARY KEY,
    municipality_name VARCHAR(255) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT municipality_department_id_fk
      FOREIGN KEY(department_id) 
	    REFERENCES Department(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Category(
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE Chat_Status(
    id SERIAL PRIMARY KEY,
    chat_status_name VARCHAR(255) NOT NULL
);

CREATE TABLE Person(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    psswrd VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    role_id INT DEFAULT 2 NOT NULL,
    CONSTRAINT person_role_id_fk
      FOREIGN KEY(role_id) 
	    REFERENCES Person_Role(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Person_Rating(
    person_id INT NOT NULL,
    reviewer_id INT NOT NULL,
    rating_id INT NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    PRIMARY KEY(person_id, reviewer_id),
    CONSTRAINT person_rating_person_id_fk
      FOREIGN KEY(person_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT person_rating_reviewer_id_fk
      FOREIGN KEY(reviewer_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT person_rating_rating_id_fk
      FOREIGN KEY(rating_id) 
	    REFERENCES Rating(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Person_Address(
    id SERIAL PRIMARY KEY,
    person_id INT UNIQUE NOT NULL,
    municipality_id INT NOT NULL,
    CONSTRAINT person_address_person_id_fk
      FOREIGN KEY(person_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT person_address_municipality_id_fk
      FOREIGN KEY(municipality_id) 
	    REFERENCES Municipality(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Product(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    expiration_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() + INTERVAL '30 DAYS' NOT NULL,
    views INT NOT NULL DEFAULT 0,
    person_id INT NOT NULL,
    category_id INT NOT NULL,
    condition_id INT NOT NULL,
    CONSTRAINT product_person_id_fk
      FOREIGN KEY(person_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT product_category_id_fk
      FOREIGN KEY(category_id) 
	    REFERENCES Category(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT product_condition_id_fk
      FOREIGN KEY(condition_id) 
	    REFERENCES Condition(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Photo(
    id SERIAL PRIMARY KEY,
    photo VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT photo_product_id_fk
      FOREIGN KEY(product_id) 
	    REFERENCES Product(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Wishlist(
    id SERIAL PRIMARY KEY,
    person_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT wishlist_person_id_fk
      FOREIGN KEY(person_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT wishlist_product_id_fk
      FOREIGN KEY(product_id) 
	    REFERENCES Product(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Subscription(
    id SERIAL PRIMARY KEY,
    person_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT subscription_person_id_fk
      FOREIGN KEY(person_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT subscription_category_id_fk
      FOREIGN KEY(category_id) 
	    REFERENCES Category(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Chat(
    id SERIAL PRIMARY KEY,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    chat_status_id INT NOT NULL,
    CONSTRAINT chat_buyer_id_fk
      FOREIGN KEY(buyer_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT chat_seller_id_fk
      FOREIGN KEY(seller_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT chat_chat_status_id_fk
      FOREIGN KEY(chat_status_id) 
	    REFERENCES Chat_Status(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Chat_Message(
    id SERIAL PRIMARY KEY,
    reply VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    person_id INT NOT NULL,
    chat_id INT NOT NULL,
    CONSTRAINT chat_message_person_id_fk
      FOREIGN KEY(person_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT chat_message_chat_id_fk
      FOREIGN KEY(chat_id) 
	    REFERENCES Chat(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE complaintCategories(
  cod_complaintCategories SERIAL PRIMARY KEY,
  nombre_category VARCHAR(255)
);

CREATE TABLE Complaints(
  id SERIAL PRIMARY KEY,
  person_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,  
  cod_complaintCategories INT,
  FOREIGN KEY (person_id)
    REFERENCES person(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (reviewer_id)
    REFERENCES person(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (cod_complaintCategories)
    REFERENCES complaintCategories(cod_complaintCategories)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  UNIQUE(person_id, reviewer_id)
);

-- Complaint Categories
INSERT INTO complaintCategories (nombre_category) VALUES ('Racismo');
INSERT INTO complaintCategories (nombre_category) VALUES ('Acoso');
INSERT INTO complaintCategories (nombre_category) VALUES ('Violencia verbal');
INSERT INTO complaintCategories (nombre_category) VALUES ('Estafa');

-- Roles
INSERT INTO Person_Role (role_name) VALUES ('admin');
INSERT INTO Person_Role (role_name) VALUES ('user');

-- Ratings
INSERT INTO Rating (rating_value) VALUES (1);
INSERT INTO Rating (rating_value) VALUES (2);
INSERT INTO Rating (rating_value) VALUES (3);
INSERT INTO Rating (rating_value) VALUES (4);
INSERT INTO Rating (rating_value) VALUES (5);

-- Conditions
INSERT INTO Condition (condition_name) VALUES ('Nuevo');
INSERT INTO Condition (condition_name) VALUES ('Usado');
INSERT INTO Condition (condition_name) VALUES ('Semi-usado');

-- Departments
INSERT INTO Department (department_name) VALUES ('Atlántida');
INSERT INTO Department (department_name) VALUES ('Colón');
INSERT INTO Department (department_name) VALUES ('Comayagua');
INSERT INTO Department (department_name) VALUES ('Copán');
INSERT INTO Department (department_name) VALUES ('Cortés');
INSERT INTO Department (department_name) VALUES ('Choluteca');
INSERT INTO Department (department_name) VALUES ('El Paraíso');
INSERT INTO Department (department_name) VALUES ('Francisco Morazán');
INSERT INTO Department (department_name) VALUES ('Gracias a Dios');
INSERT INTO Department (department_name) VALUES ('Intibucá');
INSERT INTO Department (department_name) VALUES ('Islas de la Bahía');
INSERT INTO Department (department_name) VALUES ('La Paz');
INSERT INTO Department (department_name) VALUES ('Lempira');
INSERT INTO Department (department_name) VALUES ('Ocotepeque');
INSERT INTO Department (department_name) VALUES ('Olancho');
INSERT INTO Department (department_name) VALUES ('Santa Bárbara');
INSERT INTO Department (department_name) VALUES ('Valle');
INSERT INTO Department (department_name) VALUES ('Yoro');

-- Atlántida
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Ceiba', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Porvenir', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Tela', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jutiapa', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Masica', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Arizona', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Esparta', 1);

-- Colón
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Trujillo', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Balfate', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Iriona', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Limón', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sabá', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Fe', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rosa de Aguán', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sonaguera', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Tocoa', 2);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Bonito Oriental', 2);

-- Comayagua
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Comayagua', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ajuterique', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Rosario', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Esquías', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Humuya', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Libertad', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lamaní', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Trinidad', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lejamaní', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Meámbar', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Minad de Oro', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ojos de Agua', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Jerónimo', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José de Comayagua', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José del Potrero', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Luis', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Sebastián', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Siguatepeque', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Villa de San Antonio', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Las Lajas', 3);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Taulabé', 3);

-- Copán
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rosa de Copán', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cabañas', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Copán Ruinas', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Corquín', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cucuyagua', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dolores', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dulce Nombre', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Paraíso', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Florida', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Jigua', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Unión', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nueva Arcadia', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Agustín', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Jerónimo', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Juan de Opoa', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Nicolás', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Pedro', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rita', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Trinidad de Copán', 4);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Veracruz', 4);

-- Cortés
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Pedro Sula', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Choloma', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Omoa', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Pimienta', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Potrerillos', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Puerto Cortés', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio de Cortés', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Yojoa', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Manuel', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Cruz de Yojoa', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Villanueva', 5);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Lima', 5);

-- Choluteca
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Choluteca', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Apacilagua', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepcion de María', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Duyure', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Corpus', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Triunfo', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Marcovia', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Morolica', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Namasigue', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Orocuina', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Pespire', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio de Flores', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Isidro', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Marcos de Colón', 6);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Ana de Yusguare', 6);

-- El Paraíso
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yuscarán', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Alauca', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Danlí', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Paraíso', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Güinope', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jacaleapa', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Liure', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Morocelí', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Oropolí', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Potrerillos', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio de Flores', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Lucas', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Matías', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Soledad', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Teupasenti', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Texiguat', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Vado Ancho', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yauyupe', 7);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Trojes', 7);

-- Francisco Morazán
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Distrito Central', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Alubarén', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cedros', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Curarén', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Porvenir', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guaimaca', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Libertad', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Venta', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lepaterique', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Maraita', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Marale', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nueva Armenia', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ojojona', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Orica', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Reitoca', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sabanagrande', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio de Oriente', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Buenaventura', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Ignacio', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Juan de Flores', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Miguelito', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Ana', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Lucía', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Tatumbla', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Valle de Ángeles', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Villa de San Francisco', 8);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Vallecillo', 8);

-- Gracias a Dios
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Puerto Lempira', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Brus Laguna', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ahuas', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Juan Francisco Bulnes', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Villeda Morales', 9);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Wampusirpe', 9);

-- Intibucá
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Esperanza', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Camasca', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Colomoncagua', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dolores', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Intibucá', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jesús de Otoro', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Magdalena', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Isidro', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Juan', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Marcos de la Sierra', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Miguelito', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Lucía', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yamaranguila', 10);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Opalaca', 10);

-- Islas de la Bahía
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Roatán', 11);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guanaja', 11);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('José Santos Guardiola', 11);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Utila', 11);

-- La Paz
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Paz', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Aguanqueterique', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cabañas', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Cane', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Chinacla', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guajiquiro', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lauterique', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Marcala', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Mercedes de Oriente', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Opatoro', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Antonio del Norte', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Juan', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Pedro de Tutule', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Ana', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Elena', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa María', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santiago de Puringla', 12);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yarula', 12);

-- Lempira
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Gracias', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Belén', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Candelaria', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Cololaca', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Erandique', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Gualcince', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Guarita', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('La Campa', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('La Iguala', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Las Flores', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('La Unión', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('La Virtud', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Lepaera', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Mapulaca', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Piraera', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Andrés', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Francisco', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Juan Guarita', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Manuel Colohete', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Rafael', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Sebastián', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Santa Cruz', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Talgua', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Tambla', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Tomalá', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Valladolid', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('Virginia', 13);
INSERT INTO Municipality (municipality_name,department_id) VALUES ('San Marcos de Caiquín', 13);

-- Ocotepeque
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ocotepeque', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Belén Gualcho', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dolores Merendón', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Fraternidad', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Encarnación', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Labor', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Lucerna', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Mercedes', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Fernando', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco del Valle', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Jorge', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Marcos', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Fe', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sensenti', 14);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sinuapa', 14);

-- Olancho
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Juticalpa', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Campamento', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Catacamas', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concordia', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Dulce Nombre de Culmí', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Rosario', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Esquipulas del Norte', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Gualaco', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guarizama', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guata', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Guayape', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jano', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Unión', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Mangulile', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Manto', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Salamá', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Esteban', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Becerra', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de la Paz', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa María del Real', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Silca', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yocón', 15);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Patuca', 15);

-- Santa Bárbara
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Bárbara', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Arada', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Atima', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Azacualpa', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ceguaca', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción del Norte', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Concepción del Sur', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Chinda', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Níspero', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Gualala', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Ilama', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Las Vegas', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Macuelizo', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Naranjito', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nuevo Celilac', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nueva Frontera', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Petoa', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Protección', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Quimistán', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Ojuera', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San José de las Colinas', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Luis', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Marcos', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Nicolás', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Pedro Zacapa', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Vicente Centenario', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rita', 16);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Trinidad', 16);

-- Valle
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Nacaome', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Alianza', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Amapala', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Aramecina', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Caridad', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Goascorán', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Langue', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco de Coray', 17);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Lorenzo', 17);

-- Yoro
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yoro', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Arenal', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Negrito', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Progreso', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jocón', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Morazán', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Olanchito', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Santa Rita', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Sulaco', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Victoria', 18);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Yorito', 18);

-- Categories
INSERT INTO Category (category_name) VALUES ('Electrodomésticos');
INSERT INTO Category (category_name) VALUES ('Computadoras');
INSERT INTO Category (category_name) VALUES ('Celulares y Accesorios');
INSERT INTO Category (category_name) VALUES ('Videojuegos');
INSERT INTO Category (category_name) VALUES ('Salud y Belleza');
INSERT INTO Category (category_name) VALUES ('Moda para Mujer');
INSERT INTO Category (category_name) VALUES ('Moda para Hombre');
INSERT INTO Category (category_name) VALUES ('Hogar y Jardín');
INSERT INTO Category (category_name) VALUES ('Hogar y Cocina');
INSERT INTO Category (category_name) VALUES ('Instrumentos Musicales');
INSERT INTO Category (category_name) VALUES ('Libros');
INSERT INTO Category (category_name) VALUES ('Vehículos');

-- Persons
INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'HonduMarket',
  'App',
  '1111-1111',
  'hondumarketapp@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-08-01 00:00:00'
);

INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'Any',
  'Lorenzana',
  '2222-2222',
  'any@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-08-01 00:00:00'
);

INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'Isaac',
  'Aguilar',
  '3333-3333',
  'ifaguilarnunez@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-08-01 00:00:00'
);

INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'Jazmín',
  'Maradiaga',
  '4444-4444',
  'jazmin@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-09-01 00:00:00'
);

INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'Josué',
  'Zelaya',
  '5555-5555',
  'josue@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-10-01 00:00:00'
);

INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'Jovanny',
  'Rubio',
  '6666-6666',
  'jovanny@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-10-01 00:00:00'
);

INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'Williams',
  'Ramos',
  '7777-7777',
  'williams@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-11-01 00:00:00'
);

INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'Daniel',
  'Ramos',
  '8888-8888',
  'daniel@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-11-01 00:00:00'
);

INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'Pedro',
  'Molina',
  '9999-9999',
  'pedro@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-11-01 00:00:00'
);

INSERT INTO Person (
  first_name,
  last_name,
  phone,
  email,
  psswrd,
  avatar,
  created_at
) VALUES (
  'Leonel',
  'Messi',
  '1010-1010',
  'messi@gmail.com',
  '$2b$10$Gejo9A6FWNczw6IZJvdCcetGI3EeEUbNMCLvUgDiSkBQIUbtbDxR.',
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png',
  '2022-12-01 00:00:00'
);

-- Persons Address
INSERT INTO Person_Address (person_id, municipality_id) VALUES (1, 110);
INSERT INTO Person_Address (person_id, municipality_id) VALUES (2, 110);
INSERT INTO Person_Address (person_id, municipality_id) VALUES (3, 19);
INSERT INTO Person_Address (person_id, municipality_id) VALUES (4, 19);
INSERT INTO Person_Address (person_id, municipality_id) VALUES (5, 63);
INSERT INTO Person_Address (person_id, municipality_id) VALUES (6, 63);
INSERT INTO Person_Address (person_id, municipality_id) VALUES (7, 93);
INSERT INTO Person_Address (person_id, municipality_id) VALUES (8, 93);
INSERT INTO Person_Address (person_id, municipality_id) VALUES (9, 1);
INSERT INTO Person_Address (person_id, municipality_id) VALUES (10, 1);

-- Electrodomésticos

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Licuadora Ninja Professional Plus',
  'Licuadora perfecta para todo tipo de situaciones',
  2899.99,
  1,
  1,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Refrigeradora LG con dispensador de hielo',
  'Refrigeradora de dos puertas con dispensador de hielo',
  57999.99,
  1,
  1,
  2
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Estufa eléctrica Frigidaire',
  'Estufa eléctrica de cerámica con 4 hornillas',
  26599.99,
  2,
  1,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Lavadora Whirlpool de carga superior',
  'Lavadora de 12 ciclos para un lavado perfecto',
  16999.99,
  2,
  1,
  3
);

-- Computadoras

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Microsoft Surface Laptop 5 15"',
  'Laptop con procesador Intel Core i7 de 12va generación, 16GB de RAM DDR5 y disco de estado sólido de 512GB',
  24299.99,
  3,
  2,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Apple MacBook Pro 14"',
  'Laptop con procesador Apple M1 Pro, 16GB de RAM DDR5 y disco de estado sólido de 1TB',
  48499.99,
  3,
  2,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Dell XPS 15"',
  'Laptop con procesador Intel Core i9 de 12va generación, 16GB de RAM DDR5 y disco de estado sólido de 1TB',
  37599.99,
  4,
  2,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'HP ENVY 17"',
  'Laptop con procesador Intel Core i7 de 12va generación, 16GB de RAM DDR4 y disco de estado sólido de 1TB',
  31499.99,
  4,
  2,
  1
);

-- Celulares y Accesorios

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Apple iPhone 14 Pro Max',
  'SmartPhone con 512GB de almacenamiento, cámara de 48MP, red 5G',
  24299.99,
  5,
  3,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Samsung Galaxy S22 Ultra',
  'SmartPhone con 128GB de almacenamiento, cámara de 40MP, red 5G',
  28999.99,
  5,
  3,
  3
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Huawei Mate 50 Pro',
  'SmartPhone con 256GB de almacenamiento, cámara de 50MP, red 5G',
  28999.99,
  1,
  3,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Xiaomi 12T Pro',
  'SmartPhone con 128GB de almacenamiento, cámara de 20MP, red 5G',
  14999.99,
  1,
  3,
  1
);

-- Videojuegos

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Call of Duty: Modern Warfare 2',
  'Videojuego first-person shooter para Xbox Series X/S',
  1699.99,
  2,
  4,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'A Plague Tale: Requiem',
  'Videojuego acción-aventura para Xbox Series X/S',
  1699.99,
  2,
  4,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Bayonetta 3',
  'Videojuego acción-aventura para Nintendo Switch',
  1499.99,
  3,
  4,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Mario + Rabbids Sparks of Hope',
  'Videojuego acción-aventura para Nintendo Switch',
  1499.99,
  3,
  4,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Halo Infinite',
  'Videojuego acción-aventura para Xbox Series X/S',
  699.99,
  4,
  4,
  2
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'Spider-Man: Miles Morales',
  'Videojuego acción-aventura para PlayStation 5',
  999.99,
  4,
  4,
  3
);

-- Salud y Belleza

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'CeraVe PM Facial Moisturizing Lotion',
  'Crema humectante ligera de uso nocturno formulada con tres ceramidas esenciales que ayudan a fortalecer la barrera natural de la piel, ácido hialurónico hidratante y niacinamida que ayuda a calmar la piel.',
  750.00,
  5,
  5,
  1
);

INSERT INTO Product (
  product_name,
  product_description,
  price,
  person_id,
  category_id,
  condition_id
) VALUES (
  'CeraVe Foaming Facial Cleanser',
  'El gel limpiador elimina el exceso de sebo restaurando la barrera protectora de la piel. Limpia profundamente y refresca, mientras remueve el exceso de grasa y maquillaje.',
  620.00,
  5,
  5,
  1
);

-- Moda para Mujer



-- Moda para Hombre


-- Hogar y Jardín



-- Hogar y Cocina



-- Instrumentos Musicales



--Libros



-- Vehículos



-- Licuadora Ninja Professional Plus

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784670/HonduMarket/fahvjv9ma3ut40b7cvkk.png',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784670/HonduMarket/xb2pkmfvdujdfzzvh2dk.png',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784670/HonduMarket/fcbijnplbawfi5kqadnt.png',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784683/HonduMarket/xfccabbqqudbkevcvwfd.png',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784670/HonduMarket/b8rsqvk7vi7bfnnokcgk.png',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784683/HonduMarket/zty3esf0nkminp9umi5w.png',
  1
);

-- Refrigeradora LG con dispensador de hielo

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/pwlk24gmixifq7bfuckt.png',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/xtli4cfh2ab7d0rwolhb.png',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/r3bprlmupnwwl0aauczn.png',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/vyeiptt75h9l6mmnj4ir.png',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/bxeapnom815c4esac4qv.png',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/vcdsmxw88kgzadwlkxlj.png',
  2
);

-- Estufa eléctrica Frigidaire

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786401/HonduMarket/jcyihwnujshmfnzhqa01.png',
  3
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786401/HonduMarket/iseyse7e6qbnueke5lk8.png',
  3
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786401/HonduMarket/inkvvthtzyl2qyvfd6tw.png',
  3
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786402/HonduMarket/b0ztuph6xy4bs48lizml.jpg',
  3
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786402/HonduMarket/yungzpvobcaj4r6cjazv.png',
  3
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786402/HonduMarket/u0joxgiciibqambkqcnz.png',
  3
);

-- Lavadora Whirlpool de carga superior

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667787537/HonduMarket/qgr8i1sponk6b3hbmnae.jpg',
  4
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667787537/HonduMarket/aadrya2npimx6whvusab.jpg',
  4
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667787537/HonduMarket/smh1utdfphbaskamb6qp.jpg',
  4
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667787537/HonduMarket/obcpprpfmsrf4tosthnn.jpg',
  4
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667787537/HonduMarket/a5uhcssopvcichqmgsir.jpg',
  4
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667787537/HonduMarket/jymdlshfguzmnaog9cwh.jpg',
  4
);

-- Microsoft Surface Laptop 5 15"

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/r826okrudiawkshtinv3.png',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/lugxbwflonxbvlcehbwi.png',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/tvnbt0xpzsv8tancyyqk.png',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790449/HonduMarket/si4r5ytybr9jwvjn1zhe.png',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/m722aaaa6vyloo6l10ml.png',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/wxzrwk0zir8gbyekmyql.png',
  5
);

-- Apple MacBook Pro 14"

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790773/HonduMarket/hdl2qotwcvu62yrowcdd.jpg',
  6
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790773/HonduMarket/ik3vs3oyfuqnje96uqct.jpg',
  6
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790773/HonduMarket/olwjcpqekbondq2qvw9o.jpg',
  6
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790773/HonduMarket/jeoyw1ujzxdezdzftndb.jpg',
  6
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790773/HonduMarket/jy7lhoh4q0brgditilc2.jpg',
  6
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790773/HonduMarket/sjwnvqiqrp4yajdy73od.jpg',
  6
);

-- Dell XPS 15"

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791008/HonduMarket/hsrm1sewwuo1y6ocs8y3.png',
  7
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791007/HonduMarket/vwsmhaivb0tc0y8vv4vs.png',
  7
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791007/HonduMarket/a7fwbgpskyimfe0koobc.png',
  7
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791007/HonduMarket/oqg4ohmpb4zpckqtlvbe.png',
  7
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791006/HonduMarket/qcihvzmfrprkl31gnf3z.png',
  7
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791007/HonduMarket/xh53zmxy7hvkdo9zp50w.png',
  7
);

-- HP ENVY 17"

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791245/HonduMarket/wgxjf8ociitnssatyynb.png',
  8
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791245/HonduMarket/ye47lwizhbdbvaynlo9y.png',
  8
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791245/HonduMarket/o9kuhgu75ezfzv9lnlkb.png',
  8
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791245/HonduMarket/ei3azwe7ie2bnojk0vex.png',
  8
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791245/HonduMarket/markjt4wn9brzhpfzwam.png',
  8
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791245/HonduMarket/wacfpas9vctbvgpkc545.png',
  8
);

-- Apple iPhone 14 Pro Max

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/yyjxqsd5bsf2dignptg4.png',
  9
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/mgam0temapx7xosezvhf.png',
  9
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/aq78lk9fbs0xv8zyku9c.png',
  9
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/ydqoyenza17klvg4izwk.png',
  9
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/protsjgvbmgromyeu95o.png',
  9
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/c20n1cx51d34nxssydh0.png',
  9
);

-- Samsung Galaxy S22 Ultra

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/e3syekp5hskfj97i7aad.png',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/mlyd3d3kvygm8v4pgvts.png',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/ai8t79scxzfyech885wf.png',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/wje0tsrtcrctcn7grzzv.png',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/ras6hbqswfnc4y4ervwm.png',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/ras6hbqswfnc4y4ervwm.png',
  10
);

-- Huawei Mate 50 Pro

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667794415/HonduMarket/zqjrmttk9mi2u56dvbau.png',
  11
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667794414/HonduMarket/xwkxopz03tvqmkwkdgdi.png',
  11
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667794413/HonduMarket/tewxr5qgzki0okht3s06.png',
  11
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667794414/HonduMarket/arjbfthuxlg3lc3ft3kn.png',
  11
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667794413/HonduMarket/ktzggxlhlkhjo7t7dw86.png',
  11
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667794412/HonduMarket/aohk9kdwigtzuposoq0r.png',
  11
);

-- Xiaomi 12T Pro

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277773/HonduMarket/e58vath2t7fs5nhz1ad6.png',
  12
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277770/HonduMarket/jfghipqtmw3k8h6jojhw.png',
  12
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277771/HonduMarket/afm9c9vqxpyvhfeb5vd6.png',
  12
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277769/HonduMarket/ashkjvsu0putu9tvvqjh.png',
  12
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277769/HonduMarket/wwj6yqa4lxn399l2orhz.png',
  12
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277771/HonduMarket/kth48qxhyv4pfcsc0v5b.png',
  12
);

-- Call of Duty: Modern Warfare 2

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277205/HonduMarket/iuktv7hxblkxo2x2k4k0.jpg',
  13
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277205/HonduMarket/p5dqarugmn6hbq228jva.jpg',
  13
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277206/HonduMarket/hutkzom7iygp8ixur4e6.jpg',
  13
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277205/HonduMarket/jqadefghni1aoduozwa9.jpg',
  13
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277205/HonduMarket/rnpoo7uxgk1qiycqxxbs.jpg',
  13
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668277205/HonduMarket/fggdh6a4z08xswhzrtzq.jpg',
  13
);

-- A Plague Tale: Requiem

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278147/HonduMarket/s3cdccxrxsxxnyzj2cms.jpg',
  14
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278182/HonduMarket/eejuyibudzj3al1cn8hy.jpg',
  14
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278182/HonduMarket/hzxmplhooekle8xbewml.jpg',
  14
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278182/HonduMarket/gjjj7owuyylsxdcpxzoc.jpg',
  14
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278182/HonduMarket/fzm1ifzce9rw4qfsjvlx.jpg',
  14
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278182/HonduMarket/njm0sgp8pvpldrpanghh.jpg',
  14
);

-- Bayonetta 3

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278415/HonduMarket/sh6ntiy3o3ghfywotr6o.jpg',
  15
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278414/HonduMarket/kpdbqfji0gb3ng5zilct.jpg',
  15
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278414/HonduMarket/uzkdigdhsuvpvxysvzyb.jpg',
  15
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278414/HonduMarket/r6h0kmnwr8wpfjscnpvi.jpg',
  15
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278414/HonduMarket/bwalenc1vvscptgfjjkh.jpg',
  15
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668278414/HonduMarket/edltoi3oraxrgopcnosi.jpg',
  15
);

-- Mario + Rabbids Sparks of Hope

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668281213/HonduMarket/fssc5ooqjzyjxfph9hpi.jpg',
  16
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668281213/HonduMarket/tjalbgfvgb76dyfkth7w.jpg',
  16
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668281213/HonduMarket/qwt14uw6kuvhmbn9cnf4.jpg',
  16
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668281213/HonduMarket/z1objusqlmkr7iq4gawv.jpg',
  16
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668281213/HonduMarket/kuxkir43mao9fut3ub5t.jpg',
  16
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1668281213/HonduMarket/xtd2tnodqs5qvfrxecas.jpg',
  16
);

-- Halo Infinite

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131251/HonduMarket/sq6gpihvpgd4osou235q.jpg',
  17
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131249/HonduMarket/r4cfzk3fctvh07mtpjxw.jpg',
  17
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131249/HonduMarket/ikicmzqogcpyowul21tf.jpg',
  17
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131251/HonduMarket/jwttfezq2z3ypoan4s37.jpg',
  17
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131251/HonduMarket/jxhbsfiy8lmaip8tkttu.jpg',
  17
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131250/HonduMarket/jzrnq8oa9q1cjqo3dcha.jpg',
  17
);

-- Spider-Man: Miles Morales

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131744/HonduMarket/pvevaa4jculmnjfoxsmh.jpg',
  18
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131744/HonduMarket/vxuoumupnu20lqminwkq.jpg',
  18
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131744/HonduMarket/gfimbzyrmbebcxjowcmr.jpg',
  18
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131744/HonduMarket/kfhh7gro1btpdheicdix.jpg',
  18
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131744/HonduMarket/cghmlmi5jlmeys8lh2vk.jpg',
  18
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670131744/HonduMarket/vkjuwyblzdpklq9kxcx9.jpg',
  18
);

-- CeraVe PM Facial Moisturizing Lotion

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129130/HonduMarket/ioyummhom26m8ypdbp1h.jpg',
  19
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129130/HonduMarket/u7gzau8rltpca1mjzbio.jpg',
  19
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129130/HonduMarket/yby63qosgxauhrb23wwm.jpg',
  19
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129130/HonduMarket/v6pxgnyzfgzwiphaocy7.jpg',
  19
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129130/HonduMarket/szbrrzendprplc74cydl.jpg',
  19
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129130/HonduMarket/b0t6g5eoe1trxlh35kxx.jpg',
  19
);

-- Cerave Foaming Facial Cleanser

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129714/HonduMarket/f97v3or5ukwfdbjq1as8.jpg',
  20
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129714/HonduMarket/gmufqbrjjebcigexkvih.jpg',
  20
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129714/HonduMarket/dezt0btrvdzbp94wucsh.jpg',
  20
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129714/HonduMarket/kqhipwjej0uydd1fisoo.jpg',
  20
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129714/HonduMarket/uvmapghaeosqiptt6upy.jpg',
  20
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1670129714/HonduMarket/ckovb4jhpguaoxovm6i6.jpg',
  20
);
