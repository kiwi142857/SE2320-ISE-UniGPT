import { TextField } from "@mui/material";
import React, { ChangeEventHandler } from "react";
import "../css/BasicInput.css";

// 基本输入框，通用
type BasicInputProps = {
    placeholder: string;

    // 可以通过name来获取这个输入框的值
    name: string;

    // 用来标记这个输入框是否是必填的
    required?: boolean;

    // 可选的onChange参数，传入内部TextField的onChange
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    // 传入内部TextField的value
    value?: any;

    defaultValue?: any;

    maxRows?: number;

    maxLength?: number;

    multiline?: boolean;

    // promptValue 不可编辑，且显示为输入样式
    lock?: boolean;

    onKeyDown?: any;

};

const BasicInput: React.FC<BasicInputProps> =
    ({
        placeholder,
        name,
        required = false,
        onChange,
        value,
        defaultValue,
        maxRows = 5,
        maxLength = 2000,
        multiline = true,
        onKeyDown,
        lock = false
    }) => {

    return (
        <TextField
            required={required}
            name={name}
            placeholder={placeholder}
            InputProps={{
                className: 'basic-input',
                readOnly: lock
            }}
            style={{width: '100%'}}
            inputProps={{ maxLength: maxLength }}
            multiline={multiline}
            maxRows={maxRows}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange ?? (()=>{})}
            onKeyDown={onKeyDown}
        />
    );
};

export default BasicInput;
