const VOID_TAGS = [
    'area',
    'base',
    'br',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'command',
    'keygen',
    'source'
];

interface HtmlNode {
    tag?: string;
    children?: HtmlNode[];
    comment?: string;
    text?: string;
    style?: Record<string, string>;
    [key: string]: any;
}

const OPEN_TAG_REGEX = /^<([a-zA-Z][a-zA-Z0-9\-]*)/;
const CLOSE_TAG_REGEX = /^<\/([a-zA-Z][a-zA-Z0-9\-]*)>/;
const TEXT_NODE_REGEX = /^([^<]+)/;
const ATTRIBUTE_REGEX = /^\s+([a-zA-Z][a-zA-Z0-9\-]+)="([^"]*)"/;

export class HtmlParser {
    private remainingInput: string;
    private root: HtmlNode = { children: [] };

    constructor(input: string) {
        this.remainingInput = input;
    }

    private pull(regex: RegExp, handler: (...captures: string[]) => void = () => {}): boolean {
        const match = regex.exec(this.remainingInput);
        if (match !== null) {
            const [full_match, ...captures] = match;
            this.remainingInput = this.remainingInput.slice(full_match.length);
            handler(...captures);
            return true;
        } else {
            return false;
        }
    }

    private parseAttributes(cursor: HtmlNode) {
        while (this.pull(ATTRIBUTE_REGEX, (name, value) => {
            if (name === 'style') {
                cursor[name] = this.parseStyle(value);
            } else {
                cursor[name] = value;
            }
        })) {}
        if (!this.pull(/^\s*>/)) {
            throw new Error("Malformed open tag");
        }
    }

    private parseContent(cursor: HtmlNode) {
        let run = true;
        if (cursor === null) {
            cursor = {}
        }
        while (run && this.remainingInput.length > 0) {
            const success = (
                this.pull(OPEN_TAG_REGEX, (tag) => {
                    const new_tag: HtmlNode = { tag };
                    cursor.children = cursor.children || [];
                    cursor.children.push(new_tag);
                    this.parseAttributes(new_tag);
                    if (!VOID_TAGS.includes(tag.toLowerCase())) {
                        this.parseContent(new_tag);
                    }
                }) ||
                this.pull(CLOSE_TAG_REGEX, (tag) => {
                    if (cursor.tag !== tag) {
                        throw new Error("Unmatched close tag");
                    }
                    run = false;
                }) ||
                this.pull(TEXT_NODE_REGEX, (text) => {
                    cursor.text = text;
                })
            );

            if (!success) {
                throw new Error("Parse error");
            }
        }
    }

    public parseHtml(): HtmlNode {
        this.parseContent(this.root);
        return this.root.children?.at(0) || [];
    }

    public parseStyle(styleString: string): Record<string, string> {
        const style: Record<string, string> = {};
        const stylePairs = styleString.split(';');
        stylePairs.forEach((stylePair) => {
            const [property, value] = stylePair.split(':').map((s) => s.trim());
            const camelCaseProperty = this.kebabToCamelCase(property);
            style[camelCaseProperty] = value;
        });
        return style;
    }

    private kebabToCamelCase(input: string): string {
        return input.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    }
}

export function parseHtml(input: string): HtmlNode {
    const parser = new HtmlParser(input);
    return parser.parseHtml();
}