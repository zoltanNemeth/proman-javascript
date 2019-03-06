import connection


@connection.connection_handler
def get_card_column(cursor, column_id):
    """
    Find the first status matching the given id
    :param column_id:
    :return: str
    """
    cursor.execute("""SELECT * FROM columns;""")
    columns = cursor.fetchall()
    return next((status['title'] for status in columns if status['id'] == str(column_id)), 'Unknown')


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
    boards = cursor.fetchall()
    return boards
