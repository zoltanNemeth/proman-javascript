--
-- PostgreSQL database creation for Proman
--


DROP TABLE IF EXISTS public.boards CASCADE;
DROP SEQUENCE IF EXISTS public.boards_id_seq;
CREATE TABLE boards (
    id serial NOT NULL,
    title text
);


DROP TABLE IF EXISTS public.columns CASCADE;
DROP SEQUENCE IF EXISTS public.columns_id_seq;
CREATE TABLE columns (
    id serial NOT NULL,
    title text
);


DROP TABLE IF EXISTS public.cards CASCADE ;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
CREATE TABLE cards (
    id serial NOT NULL,
    board_id integer,
    title text,
    column_id integer,
    card_order integer
);


ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_boards_id PRIMARY KEY (id);

ALTER TABLE ONLY columns
    ADD CONSTRAINT pk_columns_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_cards_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_boards_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_columns_id FOREIGN KEY (column_id) REFERENCES columns(id);


INSERT INTO boards (title) VALUES ('Board 1');
INSERT INTO boards (title) VALUES ('Board 2');

INSERT INTO columns (title) VALUES ('New');
INSERT INTO columns (title) VALUES ('In progress');
INSERT INTO columns (title) VALUES ('Testing');
INSERT INTO columns (title) VALUES ('Done');

INSERT INTO cards (board_id, title, column_id, card_order) VALUES (1, 'Sziporka', 3, 1);
INSERT INTO cards (board_id, title, column_id, card_order) VALUES (1, 'Csuporka', 3, 2);
INSERT INTO cards (board_id, title, column_id, card_order) VALUES (1, 'Puszedli', 3, 3);
INSERT INTO cards (board_id, title, column_id, card_order) VALUES (1, 'Pukkancs', 4, 1);
INSERT INTO cards (board_id, title, column_id, card_order) VALUES (2, 'Zolcsi', 1, 1);
INSERT INTO cards (board_id, title, column_id, card_order) VALUES (2, 'Z(s)ombi', 4, 1);
INSERT INTO cards (board_id, title, column_id, card_order) VALUES (2, 'Fricus', 2, 1);
INSERT INTO cards (board_id, title, column_id, card_order) VALUES (2, 'Pitbula', 2, 2);
INSERT INTO cards (board_id, title, column_id, card_order) VALUES (2, 'Scum Master', 1, 1);
