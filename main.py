from flask import Flask, render_template, url_for, request, redirect
from util import json_response
import data_handler_online

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler_online.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    cards = data_handler_online.get_cards_for_board(board_id)
    return cards


@app.route("/<board_id>/new-card", methods=['POST'])
def add_new_card(board_id):
    card_data = {
        'board_id': board_id,
        'column_id': 1,
        'title': request.form.get('board-{}-new-card'.format(board_id))
    }
    data_handler_online.add_card_to_board(card_data)
    return redirect(url_for('index'))


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
