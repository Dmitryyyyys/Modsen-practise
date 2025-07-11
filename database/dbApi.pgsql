CREATE  EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    author_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    CONSTRAINT fk_posts_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    post_id UUID NOT NULL,
    author_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL,
    user_id UUID NOT NULL,
    value SMALLINT NOT NULL CHECK (value IN (1,-1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_postlikes_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_postlikes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_post_user UNIQUE (post_id,user_id)
);

CREATE TABLE audit_logs(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action_type VARCHAR(50) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID,
    description TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION log_post_changes()
RETURNS TRIGGER AS $$ 
DECLARE 
action TEXT;
rec_id UUID;
BEGIN 
IF TG_OP = 'INSERT' THEN 
action := 'INSERT';
rec_id := NEW.id;
ELSEIF TG_OP = 'UPDATE' THEN
action:= 'UPDATE';
rec_id:= NEW.id;
ELSEIF TG_OP = 'DELETE' THEN 
action := 'DELETE';
rec_id := OLD.id;
END IF;

INSERT INTO audit_logs(
user_id,
action_type,
table_name,
record_id,
description,
timestamp
)
VALUES (
NULL,
action,
TG_TABLE_NAME,
rec_id,
format('Action %s on post ID %s', action,rec_id),
CURRENT_TIMESTAMP
);

RETURN NULL;
END;
$$ LANGUAGE plpgsql;
---Проверил создание функции в бд
SELECT pg_get_functiondef(p.oid)
FROM pg_proc p 
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE p.proname = 'log_post_changes';


SELECT *FROM USERS;
SELECT *FROM audit_logs;

SELECT table_schema, table_name FROM information_schema.tables
WHERE table_name = 'users';
