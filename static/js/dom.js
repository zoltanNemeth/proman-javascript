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
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `<li id="board-name-${board.id}">${board.title}</li>`;
        }

        const outerHtml = `<ul class="board-container">${boardList}</ul>`;

        dom._appendToElement(document.querySelector('#boards'), outerHtml);

        for (let board of boards) {
            dom.addBoardNameListener(board.id, board.title);
        }
    },
    loadCards: function (boardId, boardTitle) {
        // retrieves cards and makes showCards called
        return dataHandler.getCardsByBoardId(boardId, function(cards){
           return dom.showCards(cards, boardTitle);
        });
    },
    showCards: function (cards, boardTitle) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let boardsContainer = document.getElementById('boards');
        let boardId = cards[0].board_id;

        let currentBoard = `
             <div id="board-${boardId}" class="row">
                <form action="/${boardId}/new-card" method="post">
                    <input type="text" name="board-${boardId}-new-card" placeholder="New card">
                    <button id="board-${boardId}-new-card">Add</button>
                </form>    
                <h2 id="board-title">${boardTitle}</h2><br>
               `;
        let boardColumns = { 1: 'New', 2: 'In progress', 3: 'Testing', 4: 'Done'};

        for (let i = 1; i < 5; i++) {
            let columnDiv = `
            <div class="column">
                <h3>${boardColumns[i]}</h3>  
            `;

            for (let card of cards) {
                if (card.column_name.title === boardColumns[i]) {
                    columnDiv += `<p>${card.title}</p>`;
                }
            }

            columnDiv += '</div>';
            currentBoard += columnDiv;
        }

        currentBoard += '</div>';
        dom._appendToElement(boardsContainer, currentBoard);
        dom.addCreateCardButtonListener(boardId);
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
    addCreateCardButtonListener: function (boardId) {
        let createCardButton = document.getElementById(`board-${boardId}-new-card`);




    }
};
