import { FC } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

type Props = {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
};

export const Editor: FC<Props> = ({ placeholder, value, onChange, ...props }) => {
    return (
        <AceEditor
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            width='100%'
            height='160px'
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
