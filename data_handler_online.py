import connection


@connection.connection_handler
def get_card_column(cursor, column_id):
    """
    Find the first status matching the given id
    :param column_id:
    :return: str
    """
    cursor.execute("""SELECT title FROM columns
                    WHERE id = %(column_id)s;""",
                   {"column_id": column_id})
    column = cursor.fetchone()
    return column


@connection.connection_handler
def get_boards(cursor):
    """
    Gather all boards
    :return:
    """
    cursor.execute("""SELECT * FROM boards;""")
    boards = cursor.fetchall()
    return boards


@connection.connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute("""SELECT * FROM cards
                    WHERE board_id = %(board_id)s;""",
                   {"board_id": board_id})
    cards = cursor.fetchall()
    for card in cards:
        card["column_name"] = get_card_column(card["column_id"])
    return cards


@connection.connection_handler
def get_latest_column_order(cursor, board_id, column_id):
    cursor.execute("""SELECT card_order FROM cards
                        WHERE (board_id = %(board_id)s AND column_id = %(column_id)s);""",
                   {'board_id': board_id,
                    'column_id': column_id})
    next_card_number = 1
    for item in cursor.fetchall():
        next_card_number = item['card_order'] + 1

    return next_card_number


@connection.connection_handler
def add_card_to_board(cursor, card_data):
    cursor.execute("""INSERT INTO cards (board_id, title, column_id, card_order)
                      VALUES (%(board_id)s, %(title)s, %(column_id)s, %(card_order)s);""",
                   {'board_id': card_data['board_id'],
                    'title': card_data['title'],
                    'column_id': card_data['column_id'],
                    'card_order': get_latest_column_order(card_data['board_id'], card_data['column_id'])
                    })
