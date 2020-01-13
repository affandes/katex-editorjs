# KaTeX Plugin for EditorJs

Enable your EditorJS to write mathematical symbol with KaTeX. 

## Credits

Created with ❤ by Muhammad Affandes

## Installation

### With package manager NPM or Yarn

Run following command to install plugins.

```bash
npm install katex-editorjs
```

Or 

```bash
yarn add katex-editorjs
```

### Load via CDN

Place following line at the end of your HTML body tag.

```html
...
<script src="https://cdn.jsdelivr.net/npm/katex-editorjs"></script>
...
```

## Usage

Insert following snippets to your EditorJs configuration object.

```javascript
import KatexEditor from "./katex-editor"

// Your EditorJs init
const editorjs = new EditorJS({
    // ...
    tools: {
        katexBlock: {
            class: KatexEditor
        },
    },
    // ...
});

```

## Config Params

| Params          | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `emptyEditMode` | **String**. (*Optional*) Text shows if TeX is empty (in edit mode). |
| `emptyViewMode` | **String**. (*Optional*) Text shows if TeX is empty (in view mode). |
| `delimiter`     | **String**. (*Optional*) Delimiter character. Default is `'$$'`. |
| `throwOnError`  | **Boolean**. (*Optional*) See [KaTeX Documentation](https://katex.org/docs/options.html). Default is `false`. |
| `displayMode`   | **Boolean**. (*Optional*) See [KaTeX Documentation](https://katex.org/docs/options.html). Default is `true`. |
| `legno`         | **Boolean**. (*Optional*) See [KaTeX Documentation](https://katex.org/docs/options.html). Default is `false`. |
| `fleqn`         | **Boolean**. (*Optional*) See [KaTeX Documentation](https://katex.org/docs/options.html). Default is `true`. |
| `output`        | **String**. (*Optional*) See [KaTeX Documentation](https://katex.org/docs/options.html). Default is `'html'`. |

## Output Data

Math symbol will be wrapped with `div` tag with `.aff-katex-wrapper` class.

```json
{
    "type": "katexBlock",
    "data": {
        "tex": "\\sum{x}"
    }
}
```

