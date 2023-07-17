USE madder_db;

CREATE TABLE groupactive(
	groupId BIGINT NOT NULL,
    local VARCHAR(10),
    FOREIGN KEY(groupId) REFERENCES host (groupId) ON UPDATE CASCADE
);