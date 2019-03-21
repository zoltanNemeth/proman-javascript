from flask import Flask, render_template, url_for, request, jsonify
from util import json_response


import data_handler_online

import json


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


@app.route("/rename-board", methods=["POST"])
def update_board_title():
    board_id = request.json['boardId']
    board_title = request.json['boardTitle']
    data_handler_online.update_board_title(board_id, board_title)
    return jsonify("Success")


@app.route("/delete-card", methods=['GET', 'POST'])
def delete_card():
    card_to_delete = request.json['cardId']
    board_id = data_handler_online.get_board_id_from_card_id(card_to_delete)[0]['board_id']

    if board_id:
        data_handler_online.delete_cards(card_to_delete)

    cards = data_handler_online.get_cards_for_board(board_id)
    return json.dumps(cards)


def main():
    app.run()

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
