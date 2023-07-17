USE madder_db;

CREATE TABLE active(
    id BIGINT NOT NULL,
    local VARCHAR(10),
    FOREIGN KEY(id) REFERENCES user (id) ON UPDATE CASCADE
)