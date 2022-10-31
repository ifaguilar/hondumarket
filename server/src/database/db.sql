CREATE DATABASE hondumarket;

\c hondumarket

CREATE TABLE Person_Role(
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
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
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE Rating(
    id SERIAL PRIMARY KEY,
    rating_value INT NOT NULL
);

CREATE TABLE Condition(
    id SERIAL PRIMARY KEY,
    condition_name VARCHAR(255) NOT NULL
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
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
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
    price INT NOT NULL,
    expiration_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    is_active BOOLEAN NOT NULL,
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
    person_id INT UNIQUE NOT NULL,
    CONSTRAINT wishlist_person_id_fk
      FOREIGN KEY(person_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Product_Wishlist(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    product_id INT NOT NULL,
    wishlist_id INT NOT NULL,
    CONSTRAINT product_wishlist_product_id_fk
      FOREIGN KEY(product_id) 
	    REFERENCES Product(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT product_wishlist_wishlist_id_fk
      FOREIGN KEY(wishlist_id) 
	    REFERENCES Wishlist(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Subscription(
    id SERIAL PRIMARY KEY,
    person_id int NOT NULL,
    CONSTRAINT subscription_person_id_fk
      FOREIGN KEY(person_id) 
	    REFERENCES Person(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Category_Subscription(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    category_id INT NOT NULL,
    subscription_id INT NOT NULL,
    CONSTRAINT category_subscription_category_id_fk
      FOREIGN KEY(category_id) 
	    REFERENCES Category(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
    CONSTRAINT category_subscription_subscription_id_fk
      FOREIGN KEY(subscription_id) 
	    REFERENCES Subscription(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE Chat(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
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
    created_at TIMESTAMP NOT NULL,
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

INSERT INTO Person_Role (role_name) VALUES ('admin');
INSERT INTO Person_Role (role_name) VALUES ('user');

INSERT INTO Department (department_name) VALUES ('Atlantida');
INSERT INTO Department (department_name) VALUES ('Colon');
INSERT INTO Department (department_name) VALUES ('Comayagua');
INSERT INTO Department (department_name) VALUES ('Copan');
INSERT INTO Department (department_name) VALUES ('Cortes');
INSERT INTO Department (department_name) VALUES ('Choluteca');
INSERT INTO Department (department_name) VALUES ('El Paraiso');
INSERT INTO Department (department_name) VALUES ('Francisco Morazan');
INSERT INTO Department (department_name) VALUES ('Gracias a Dios');
INSERT INTO Department (department_name) VALUES ('Intibuca');
INSERT INTO Department (department_name) VALUES ('Islas de la Bahia');
INSERT INTO Department (department_name) VALUES ('La Paz');
INSERT INTO Department (department_name) VALUES ('Lempira');
INSERT INTO Department (department_name) VALUES ('Ocotepeque');
INSERT INTO Department (department_name) VALUES ('Olancho');
INSERT INTO Department (department_name) VALUES ('Santa Barbara');
INSERT INTO Department (department_name) VALUES ('Valle');
INSERT INTO Department (department_name) VALUES ('Yoro');

INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Ceiba', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('El Porvenir', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Tela', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Jutiapa', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('La Masica', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('San Francisco', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Arizona', 1);
INSERT INTO Municipality (municipality_name, department_id) VALUES ('Esparta', 1);
