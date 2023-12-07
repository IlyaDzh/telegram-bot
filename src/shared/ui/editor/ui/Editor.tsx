import { FC } from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

export const Editor: FC<IAceEditorProps> = props => {
    return (
        <AceEditor
            width='100%'
            mode='javascript'
            theme='monokai'
            fontSize='16px'
            highlightActiveLine={true}
            setOptions={{
                enableLiveAutocompletion: true,
                enableBasicAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
            {...props}
        />
    );
};
