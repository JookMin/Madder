USE madder_db;

CREATE TABLE grouphobby(
	groupId BIGINT NOT NULL,
    hobby VARCHAR(10),
    FOREIGN KEY(groupId) REFERENCES host (groupId) ON UPDATE CASCADE
);