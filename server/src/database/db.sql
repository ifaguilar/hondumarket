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
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
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
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
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
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
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
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    expiration_date TIMESTAMP DEFAULT NOW() + INTERVAL '30 DAYS' NOT NULL,
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
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
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
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
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
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
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
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
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
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Distrito Central (Comayagüela y Tegucigalpa)', 8);
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

-- Municipios de Yoro
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

/*********************

ANTES DE SEGUIR, EJECUTAR EL SCRIPT HASTA INSERTAR LAS CATEGORÍAS,
LUEGO CREAR UN USUARIO UTILIZANDO EL FORMULARIO DE REGISTRO CON
LOS SIGUIENTES DATOS:

Nombre: HonduMarket
Apellido: App
Teléfono: 1234-5678
Correo electrónico: hondumarketapp@gmail.com
Contraseña: (Puede ser cualquiera)
Departamento: Francisco Morazán
Municipio: Distrito Central

DESPUÉS IR A LA TABLA 'Person' Y CAMBIAR EL ROL DEL USUARIO DE 2 A 1.
HECHOS ESTOS PASOS PUEDEN SEGUIR EJECUTANDO EL RESTO DEL SCRIPT.

*********************/

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
  'Estufa eléctrica Frigidaire',
  'Estufa eléctrica de cerámica con 4 hornillas',
  26599.99,
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
  'Lavadora Whirlpool de carga superior',
  'Lavadora de 12 ciclos para un lavado perfecto',
  16999.99,
  1,
  1,
  1
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
  1,
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
  1,
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
  1,
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
  1,
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
  'Samsung Galaxy S22 Ultra',
  'SmartPhone con 128GB de almacenamiento, cámara de 40MP, red 5G',
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
  1,
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
  1,
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
  1,
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
  1,
  4,
  1
);

-- Salud y Belleza



-- Moda para Mujer



-- Moda para Hombre


-- Hogar y Jardín



-- Hogar y Cocina



-- Instrumentos Musicales



--Libros



-- Vehículos



-- Photos (Product 1)

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784670/HonduMarket/fahvjv9ma3ut40b7cvkk.webp',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784670/HonduMarket/xb2pkmfvdujdfzzvh2dk.webp',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784670/HonduMarket/fcbijnplbawfi5kqadnt.webp',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784683/HonduMarket/xfccabbqqudbkevcvwfd.webp',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784670/HonduMarket/b8rsqvk7vi7bfnnokcgk.webp',
  1
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667784683/HonduMarket/zty3esf0nkminp9umi5w.webp',
  1
);

-- Photos (Product 2)

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/pwlk24gmixifq7bfuckt.webp',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/xtli4cfh2ab7d0rwolhb.webp',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/r3bprlmupnwwl0aauczn.webp',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/vyeiptt75h9l6mmnj4ir.webp',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/bxeapnom815c4esac4qv.webp',
  2
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667785666/HonduMarket/vcdsmxw88kgzadwlkxlj.webp',
  2
);

-- Photos (Product 3)

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786401/HonduMarket/jcyihwnujshmfnzhqa01.webp',
  3
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786401/HonduMarket/iseyse7e6qbnueke5lk8.webp',
  3
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786401/HonduMarket/inkvvthtzyl2qyvfd6tw.webp',
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
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786402/HonduMarket/yungzpvobcaj4r6cjazv.webp',
  3
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667786402/HonduMarket/u0joxgiciibqambkqcnz.webp',
  3
);

-- Photos (Product 4)

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

-- Photos (Product 5)

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/r826okrudiawkshtinv3.webp',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/lugxbwflonxbvlcehbwi.webp',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/tvnbt0xpzsv8tancyyqk.webp',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790449/HonduMarket/si4r5ytybr9jwvjn1zhe.webp',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/m722aaaa6vyloo6l10ml.webp',
  5
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667790448/HonduMarket/wxzrwk0zir8gbyekmyql.webp',
  5
);

-- Photos (Product 6)

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

-- Photos (Product 7)

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

-- Photos (Product 8)

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

-- Photos (Product 9)

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/yyjxqsd5bsf2dignptg4.webp',
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
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/aq78lk9fbs0xv8zyku9c.webp',
  9
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/ydqoyenza17klvg4izwk.webp',
  9
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/protsjgvbmgromyeu95o.webp',
  9
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667791842/HonduMarket/c20n1cx51d34nxssydh0.webp',
  9
);

-- Photos (Product 10)

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/e3syekp5hskfj97i7aad.webp',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/mlyd3d3kvygm8v4pgvts.webp',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/ai8t79scxzfyech885wf.webp',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/wje0tsrtcrctcn7grzzv.webp',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/ras6hbqswfnc4y4ervwm.webp',
  10
);

INSERT INTO Photo (
  photo,
  product_id
) VALUES (
  'https://res.cloudinary.com/dbh92pwr9/image/upload/v1667793148/HonduMarket/ras6hbqswfnc4y4ervwm.webp',
  10
);

-- Photos (Product 11)

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
