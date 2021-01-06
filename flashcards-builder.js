'use strict';

this.buildFlashcards = (words, containerId, page, padding) => {
    document.body.classList.add('cards', page, padding);

    let container = document.getElementById(containerId);

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
        container.appendChild(page);

        // build viewbox to fit the text exactly
        const bbox = svg.getBBox();
        svg.setAttribute("width", bbox.width);
        svg.setAttribute("height", bbox.height);
        svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    }
};
