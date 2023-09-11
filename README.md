# symbols-html-parser

## Description

`symbols-html-parser` is a JavaScript library that allows you to parse HTML into a structured object format. It provides a way to convert HTML markup into a tree-like structure, making it easier to work with and manipulate HTML content programmatically.

## Installation

To install `symbols-html-parser`, you can use npm:

```bash
npm install symbols-html-parser
```

## Usage

To use symbols-html-parser, import it into your JavaScript or TypeScript code:

```javascript
const { parseHtml } = require('symbols-html-parser/dist'); // For CommonJS
// or
import { parseHtml } from 'symbols-html-parser/dist'; // For ES Modules
```

### To parse an HTML file using the command line interface (CLI), run the following command:
```bash
node symbols-html-parser/dist/main.js example.html
```
## Parsing HTML
You can parse HTML content using the parseHtml function:

```javascript
const html = `
<div style="background-color: yellow; font-size: 14px" id="first-div">
    Hello, friends
    <p class="para" style="font-faimly: monospace; font-size: 11px">
        Lorem ipsum dolor sit
    </p>
    <footer style="width: auto; height: 100px; color: blue">
        <span>
            This is the end
        </span>
    </footer>
</div>`;
const parsedHtml = parseHtml(html);
console.log(parsedHtml);
```

The `parseHtml` function takes an HTML string as input and returns a structured object representing the HTML content.

## Example Output
Here's an example of the output structure:

```javascript
{
  tag: 'div',
  text: 'Hello, friends',
  style: {
    backgroundColor: 'yellow',
    fontSize: '14px'
  },
  id: 'first-div',
  children: [{
    tag: 'p',
    text: 'Lorem ipsum dolor sit',
    class: 'para',
    style: {
      fontFamily: 'monospace',
      fontSize: '11px',
    }
  }, {
    tag: 'footer',
    style: {
      width: 'auto',
      height: '100px',
      color: 'blue',
    },
    children: [{ tag: 'span', text: 'This is the end' }]
  }]
}
```

## Using symbols-html-parser in a Browser
symbols-html-parser can be used in a web browser environment just like any other JavaScript library. To use it, you'll need to include the library in your HTML file and use it in your client-side JavaScript code. Here's a step-by-step guide on how to do that:

## Step 1: Include the Library
Include the symbols-html-parser library in your HTML file using a script tag. You can host the library on a CDN or include it from a local file. Here's an example using a CDN:

Note: I am going to deploy to CDN later
```html

<script src="https://cdn.jsdelivr.net/npm/symbols-html-parser/dist/main.js"></script>
```
