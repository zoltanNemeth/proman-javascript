import connection


@connection.connection_handler
def get_card_status(cursor, column_id):
    """
    Find the first status matching the given id
    :param column_id:
    :return: str
    """
    cursor.execute("""SELECT question_id, message FROM answer
                          WHERE user_id = %(user_id)s;""",
                   {'user_id': user_id})
    statuses = cursor.fetchall()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


@connection.connection_handler
def get_boards(cursor):
    """
    Gather all boards
    :return:
    """
    cursor.execute("""SELECT * FROM boards;""")
    boards = cursor.fetchall()
    return boards


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards
