// @ts-ignore

import {HtmlParser} from "./symbol-html-parser";

describe('HtmlParser', () => {
    it('should parse an HTML string into an HtmlNode', () => {
        const htmlString = '<div class="container">Hello, <b>world</b></div>';
        const parser = new HtmlParser(htmlString);
        const rootNode = parser.parseHtml();

        expect(rootNode).toEqual({
            tag: 'div',
            text: 'Hello, ',
            class: 'container',
            children: [
                {tag: 'b', text: 'world'}
            ]
        });
    });
    it('should parse a style string into a style object', () => {
        const styleString = 'color: red; font-size: 16px; background-color: #fff;';
        const parser = new HtmlParser('');
        const styleObject = parser.parseStyle(styleString);

        expect(styleObject).toEqual({
            color: 'red',
            fontSize: '16px',
            backgroundColor: '#fff',
        });
    });

    it('should handle a malformed open tag gracefully', () => {
        const htmlString = '<div class="container"';
        const parser = new HtmlParser(htmlString);

        expect(() => parser.parseHtml()).toThrowError('Malformed open tag');
    });

    it('should handle an unmatched close tag gracefully', () => {
        const htmlString = '<div></p>';
        const parser = new HtmlParser(htmlString);

        expect(() => parser.parseHtml()).toThrowError('Unmatched close tag');
    });

    it('should handle a parse error gracefully', () => {
        const htmlString = '<div><></div>';
        const parser = new HtmlParser(htmlString);

        expect(() => parser.parseHtml()).toThrowError('Parse error');
    });
});

describe('HtmlParser with provided HTML', () => {
    const providedHtml = `<div style="background-color: yellow; font-size: 14px" id="first-div">Hello, friends<p class="para" style="font-family: monospace; font-size: 11px">Lorem ipsum dolor sit</p><footer style="width: auto; height: 100px; color: blue"><span>This is the end</span></footer></div>`;

    it('should parse the provided HTML correctly', () => {
        const parser = new HtmlParser(providedHtml);
        const rootNode = parser.parseHtml();

        expect(rootNode).toEqual({
            tag: 'div',
            style: {
                backgroundColor: 'yellow',
                fontSize: '14px',
            },
            id: 'first-div',
            text: 'Hello, friends',
            children: [
                {
                    tag: 'p',
                    class: 'para',
                    style: {
                        fontFamily: 'monospace',
                        fontSize: '11px',
                    },
                    text: 'Lorem ipsum dolor sit',
                },
                {
                    tag: 'footer',
                    style: {
                        width: 'auto',
                        height: '100px',
                        color: 'blue',
                    },
                    children: [
                        {
                            tag: 'span',
                            text: 'This is the end'
                        },
                    ],
                },
            ],
        });
    });

    it('should parse the provided HTML and style correctly', () => {
        const parser = new HtmlParser(providedHtml);
        const rootNode = parser.parseHtml();
        const expectedStyle = {
            backgroundColor: 'yellow',
            fontSize: '14px',
        };

        expect(rootNode.style).toEqual(expectedStyle);
    });
});