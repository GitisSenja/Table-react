import React, {ChangeEvent, FC, useState} from "react";

import {SearchInputProps} from "./types";

const SearchInput: FC<SearchInputProps> = ({fieldId, onFilterState}) => {
    const [value, setValue] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        onFilterState(e.target.value, fieldId)
    }

    return (
        <input placeholder={fieldId} value={value} onChange={handleChange}/>
    )
};

export default SearchInput;
