USE madder_db;

CREATE TABLE message(
	groupId BIGINT NOT NULL,
    id BIGINT NOT NULL,
	message VARCHAR(255),
    messageTime DATETIME,
    FOREIGN KEY(id) REFERENCES user (id) ON UPDATE CASCADE,
    FOREIGN KEY(groupId) REFERENCES host (groupId) ON UPDATE CASCADE
);