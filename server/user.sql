USE madder_db;

CREATE TABLE user(
	id BIGINT NOT NULL PRIMARY KEY,
	name VARCHAR(20),
    state VARCHAR(255),
    UNIQUE KEY(name)
);