# HTML Parser

This is a simple HTML to Virtual Tree parser that can be used both in the CLI and the browser.

## Usage

### CLI Usage

To parse an HTML file using the command line interface (CLI), run the following command:

```bash
node main.js <html-file-path>
```

## Node Js Installation


```bash
node main.js <html-file-path>
```

## Browser Usage
To use the parser in the browser, follow these steps:

Include the html-to-vtree.js script in your HTML file:
```html 
<script src="html-to-vtree.js"></script> 
```
Create a textarea element where users can input HTML:
```html 
<script src="html-to-vtree.js"></script> 
```
```javascript
const htmlString = '<div class="container">Hello, <b>world</b></div>';
const parser = new HtmlParser(htmlString);
const rootNode = parser.parseHtml();

// output 

{
    tag: 'div',
    text: 'Hello, ',
    class: 'container',
    children: [
        {tag: 'b', text: 'world'}
    ]
}
```