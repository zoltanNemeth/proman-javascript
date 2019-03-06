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
def delete_cards(cursor, card_id):
    cursor.execute(""" DELETE FROM cards 
                    WHERE id = %(card_id)s;""",
                   {"card_id": card_id})

