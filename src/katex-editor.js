const katex = require("katex");
import "katex/dist/katex.css"
import "./style.css"


/**
 * EditorJs Plugin for KateX
 * For block only
 *
 * @typedef {object} KatexData
 * @description Data structure for input and output.
 * @property {string} tex - Formula in KateX / TeX
 *
 * @typedef {object} KatexConfig
 * @description Data structure for config
 * @property {string} delimiter - Delimiter string
 *
 */
class KatexEditor {
    /**
     * Create new plugin and initiate data
     *
     * @param {KatexData}   data    - saved data in JSON
     * @param {object}      config  - user config in
     * @param {object}      api     - EditorJs API
     */
    constructor({data, config, api}) {
        this.api = api;
        this.data = {
            tex: ''
        };
        this.config = {
            delimiter: '$$',
            placeholder: 'Type here...',
            throwOnError: false,
            displayMode: true,
            leqno: false,
            fleqn: true,
            output: 'html',
            emptyEditMode: 'Try x+y',
            emptyViewMode: 'Click here to type your equation...'
        };
        this.wrapper = null;
        this.editor = null;
        this.viewer = null;

        Object.assign(this.data, data);
        Object.assign(this.config, config);
    }

    render() {

        this._setup();

        return this.wrapper

    }

    _setup() {

        // Setup wrapper
        this._createWrapper();

        // Setup editor
        this._createEditor();

        // Setup viewer
        this._createViewer();

        this.wrapper.appendChild(this.editor);
        this.wrapper.appendChild(this.viewer);
    }

    _createWrapper() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add(KatexEditor.CLASS.wrapper);
    }

    _createEditor() {
        this.editor = document.createElement('div');
        this.editor.contentEditable = true;
        this.editor.placeholder = this.config.placeholder;
        this.editor.innerHTML = this.data.tex;
        this.editor.classList.add(KatexEditor.CLASS.editor);

        if (!!this.data.tex) {
            this.editor.hidden = true;
        }

        this.api.listeners.on(this.editor, 'input', () => {
            this._updateViewer();
        }, false);
        this.api.listeners.on(this.editor, 'blur', (e) => {
            this.editor.hidden = true;
            this._updateViewer();
        }, false);
    }

    _createViewer() {
        this.viewer = document.createElement('div');
        this.viewer.classList.add(KatexEditor.CLASS.viewer);
        this._updateViewer();
        this.api.listeners.on(this.viewer, 'click', () => {
            this.editor.hidden = false;
            this.editor.focus();
            this._updateViewer();
        }, false);
    }

    _updateViewer() {
        if (this.editor.textContent.length > 0) {
            katex.render(this.editor.textContent, this.viewer, this.config);
        } else {
            this.viewer.innerHTML = '';
            let info = document.createElement('SPAN');
            info.classList.add(KatexEditor.CLASS.info);
            if (this.editor.hidden) {
                info.innerText = this.config.emptyViewMode
            } else {
                info.innerText = this.config.emptyEditMode
            }
            this.viewer.appendChild(info);
        }
    }

    _toHTML(tex) {
        return
    }

    validate(data) {
        if (!!!data.tex.trim()) {
            return false;
        }
        return true;
    }

    save(content) {
        return {
            tex: this.editor.textContent.trim()
        }
    }

    static get toolbox() {
        return {
            title: 'Math',
            icon: '<svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M29.425 22.96l1.387-2.96h1.188l-2 12h-30v-2.32l10.361-12.225-10.361-10.361v-7.094h30.625l1.375 8h-1.074l-0.585-1.215c-1.104-2.293-1.934-2.785-4.341-2.785h-20.688l11.033 11.033-9.294 10.967h16.949c3.625 0 4.583-1.299 5.425-3.040z"/></svg>'
        };
    }

    static get CLASS() {
        return {
            wrapper: 'aff-katex-wrapper',
            editor: 'aff-katex-editor',
            viewer: 'aff-katex-viewer',
            info: 'aff-katex-viewer-info'
        };
    }
}

export default KatexEditor;