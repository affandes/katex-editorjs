import katex from "katex";
import './style.css'


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
export default class KatexEditor {
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
            delimiter: '$$'
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

        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(this.editor);
        this.wrapper.appendChild(this.viewer);
    }

    _createWrapper() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add(KatexEditor.cssClass.wrapper);
    }

    _createEditor() {
        this.editor = document.createElement('div');
        this.editor.contentEditable = true;
        this.editor.placeholder = 'Try a + b';
        if (this.data.tex.length === 0) {
            // create new block
        } else {
            this.editor.innerHTML = this.data.tex;
            this.editor.classList.add('aff-is-hidden');
        }
        this.api.listeners.on(this.editor, 'keyup', this._updateOutput);
        this.api.listeners.on(this.editor, 'blur', (e) => {
            console.log('Editor bluring...');
            this.editor.hidden = true;
        }, false);
    }

    _createViewer() {
        this.viewer = document.createElement('div');
        //this.viewer.id = 'vie';
        this.api.listeners.on(this.viewer, 'click', () => {
            console.log('Editor clicking...');
            this.editor.hidden = false;
            this.editor.focus();
        }, false);
    }

    _updateOutput(e) {
        const opt = {
            throwOnError: false,
            displayMode: false,
            output: 'html'
        };
        const tex = e.target.innerText;
        const output = e.target.nextElementSibling;
        /*const html = (!!tex) ? katex.renderToString(String.raw`${tex}`, opt) : 'No data';
        output.innerHTML = html;*/
        try {
            katex.render(tex, output, opt);
        } catch (e) {
            console.log('Error katex nih')
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
            tex: content.trim()
        }
    }

    static get toolbox() {
        return {
            title: 'Math',
            icon: '<svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M29.425 22.96l1.387-2.96h1.188l-2 12h-30v-2.32l10.361-12.225-10.361-10.361v-7.094h30.625l1.375 8h-1.074l-0.585-1.215c-1.104-2.293-1.934-2.785-4.341-2.785h-20.688l11.033 11.033-9.294 10.967h16.949c3.625 0 4.583-1.299 5.425-3.040z"/></svg>'
        };
    }

    static get cssClass() {
        return {
            wrapper: 'aff-katex-wrapper',
            input: 'aff-katex-input',
            output: 'aff-katex-output'
        };
    }
}