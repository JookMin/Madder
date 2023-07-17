USE madder_db;

CREATE TABLE hobby(
    id BIGINT NOT NULL,
    list VARCHAR(10),
    FOREIGN KEY(id) REFERENCES user (id) ON UPDATE CASCADE
)