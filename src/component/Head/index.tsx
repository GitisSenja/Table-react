import React, {FC} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {FormattedMessage} from "react-intl";

import {HeadProps} from "./types";
import {LOCALES} from "../../i18n/locales";

const wrapperHeadStyle = {
    display: 'flex',
    width: '100%',
    margin: '30px 20px',
    alignItems: 'center',
    justifyContent: 'start'
}

const Head: FC<HeadProps> = ({onChangeSelect, language}): JSX.Element => {

    const handleChangeSelect = (event: SelectChangeEvent) => {
        onChangeSelect(event.target.value)
    }

    return (
        <div style={wrapperHeadStyle}>
            <p><FormattedMessage id='select_language'/></p>
            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                <InputLabel id="demo-simple-select-standard-label">
                    <FormattedMessage id='language'/>
                </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={language}
                    onChange={handleChangeSelect}
                    label="Language"
                >
                    <MenuItem value={LOCALES.ENGLISH}>English</MenuItem>
                    <MenuItem value={LOCALES.RUSSIAN}>Русский</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default Head
