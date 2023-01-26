import React, {ChangeEvent, FC, useState} from "react";
import {TextField} from "@mui/material";
import {FormattedMessage} from "react-intl";

import {SearchInputProps} from "./types";

const SearchInput: FC<SearchInputProps> = ({fieldId, onFilterState}) => {
    const [value, setValue] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        onFilterState(e.target.value, fieldId)
    }

    return (
        <TextField id="standard-basic"
                   label={<FormattedMessage id={fieldId}/>}
                   value={value} onChange={handleChange}
                   variant="standard"/>
    )
};

export default SearchInput;
