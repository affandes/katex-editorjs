import EditorJS from "@editorjs/editorjs";
import KatexEditor from "./katex-editor";

const editorjs = new EditorJS({
    autofocus: false,
    tools: {
        katexBlock: {
            class: KatexEditor
        },
    },
    placeholder: 'Ketik disini...',
    data: {}
});

document.getElementById('save').onclick = function () {
    editorjs.save().then((outputData) => {
        console.log('Output: ', outputData)
    }).catch((error) => {
        console.log('Error: ', error);
    });
};