import React, {FC, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {RowProps} from "./types";
import RowDescription from "../RowDescription";

const Row: FC<RowProps> = ({row}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell sx={{width: '100px'}}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                    {row.name}
                </TableCell>
                <TableCell align="left">{row.fullName}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.population} humans</TableCell>
                <TableCell align="left">{row.square} km²</TableCell>
            </TableRow>
            <RowDescription isOpen={isOpen} history={row.history}/>
        </>
    );
}
export default Row
