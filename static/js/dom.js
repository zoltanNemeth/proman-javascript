// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for (let board of boards) {
            boardList += `<div class="col-sm-12 col-md-12 board-list" id="board-name-${board.id}">${board.title}</div>`;
        }

        const outerHtml = `<div class="board-container">${boardList}</div>`;

        this._appendToElement(document.querySelector('#boards'), outerHtml);

        for (let board of boards) {
            this.addBoardNameListener(board.id, board.title);
        }
    },
    loadCards: function (boardId, boardTitle) {
        // retrieves cards and makes showCards called
        return dataHandler.getCardsByBoardId(boardId, function (cards) {
            return dom.showCards(cards, boardTitle);
        });
    },
    showCards: function (cards, boardTitle) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let boardsContainer = document.getElementById('boards');

        let currentBoard = `
            <div class="container">
                <div id="board-${cards[0].board_id}" class="row">
                    <div class="row">
                        <h2>${boardTitle}</h2>
                    </div>
               `;
        let boardColumns = {1: 'New', 2: 'In progress', 3: 'Testing', 4: 'Done'};

        for (let i = 1; i < 5; i++) {
            let columnDiv = `
            <div class="column col-sm-2 col-md-2">
                <h3>${boardColumns[i]}</h3>
            `;

            for (let card of cards) {
                if (card.column_name.title === boardColumns[i]) {
                    let cardDiv = `<div id=card-${card.id} class="line">
                                        ${card.title}
                                        <button type="button" class="delete-card">X</button>
                                    </div>`;
                    columnDiv += cardDiv;
                }
            }

            columnDiv += '</div>';
            currentBoard += columnDiv;
        }

        currentBoard += '</div>';
        dom._appendToElement(boardsContainer, currentBoard);
        dom.dragAndDrop();
        dom.deleteCardFromBoard();
    },
    addBoardNameListener: function (boardId, boardTitle) {
        // creates an event listener for the name of the board that is listed on the homepage
        let boardName = document.getElementById(`board-name-${boardId}`);

        function hideBoard(event) {
            $(`#board-${boardId}`).remove();
            boardName.removeEventListener('click', hideBoard);
            boardName.addEventListener('click', showBoard);
        }

        function showBoard(event) {
            dom.loadCards(boardId, boardTitle);
            boardName.removeEventListener('click', showBoard);
            boardName.addEventListener('click', hideBoard);
        }

        boardName.addEventListener('click', showBoard);
    },
    dragAndDrop: function () {
        let columns = document.getElementsByClassName('column');
        let containers = [];

        for (let col of columns) {
            containers.push(col);
        }
        dragula(containers);
    },
    deleteCardFromBoard: function () {
        let deleteButtons = document.getElementsByClassName('delete-card');
        for (let button of deleteButtons) {
            button.addEventListener('click', function () {
                let card_id = this.parentNode.id;
                let card_id_database = parseInt(card_id.substr(5));
                dataHandler.deleteCard({'cardId':card_id_database}, dom.dragAndDrop);
            })
        }
    }




    // here comes more features
};
