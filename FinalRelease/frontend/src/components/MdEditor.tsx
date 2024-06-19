import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

function MdEditor({ value, onChange } : { value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
    useEffect(() => {
        const addIconSvgString = renderToString(<AddCircleIcon />);
        const vditor = new Vditor('vditor', {
            height :360,
            cache:{
                "enable":false
            },
            value: value,
            mode: "sv",
            toolbar: [
                {
                    name: "add-prompt",
                    tipPosition: "ne",
                    tip: "Add promptKey",
                    icon: addIconSvgString,
                    click: () => {
                        vditor.insertValue(' ++{} ');
                    },
                },
                "|",
                "emoji",
                "headings",
                "bold",
                "italic",
                "strike",
                "link",
                "|",
                "list",
                "ordered-list",
                "check",
                "outdent",
                "indent",
                "|",
                "quote",
                "line",
                "code",
                "inline-code",
                "insert-before",
                "insert-after",
                "table",
                "|",
                "undo",
                "redo",
                "|",
                "preview",
                "edit-mode",
                "help",
            ],
            blur: () => {
                const event = {
                    target: {
                        value: vditor.getValue(),
                        name: 'vditor'
                    }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
            }
        });
    },[]);

    return (
        <div id="vditor"></div>
    )
}

export default MdEditor;