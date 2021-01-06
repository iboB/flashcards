'use strict';

this.initializeApp = (appContainerId, cardsContainerId) => {
    const appContainer = document.getElementById(appContainerId);
    const cardsContainer = document.getElementById(cardsContainerId);

    let cardsSettings = {
        page: 'A4',
        padding: 'padding-15mm',
    };

    let switchToAppMode = () => {
        document.body.className = 'app';
        appContainer.style.display = 'block';
        cardsContainer.style.display = 'none';
    };

    let switchToCardsMode = () => {
        document.body.className = `cards ${cardsSettings.page} ${cardsSettings.padding}`;
        appContainer.style.display = 'none';
        cardsContainer.style.display = 'block';
    };

    let resetModeBasedOnURL = () => {
        if (document.location.href.indexOf('#') === -1) {
            switchToAppMode();
        }
        else {
            switchToCardsMode();
        }
    }

    window.onload = event => {
        resetModeBasedOnURL();
    }
    window.onpopstate = event => {
        resetModeBasedOnURL();
    };

    let buildCards = (words) => {
        const SVGNS = "http://www.w3.org/2000/svg";
        for (const word of words) {
            let page = document.createElement('section');
            page.classList.add('page');

            let svg = document.createElementNS(SVGNS, "svg");
            svg.classList.add('word');

            let text = document.createElementNS(SVGNS, "text");
            text.innerHTML = word;

            svg.appendChild(text);
            page.appendChild(svg);
            cardsContainer.appendChild(page);

            // build viewbox to fit the text exactly
            const bbox = svg.getBBox();
            svg.setAttribute("width", bbox.width);
            svg.setAttribute("height", bbox.height);
            svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
        }
    };

    const words = ['horse', 'ophtalmology', 'A'];
    buildCards(words);
};
