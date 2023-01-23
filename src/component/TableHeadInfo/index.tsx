import React, {FC, useState} from 'react';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import {FormattedMessage} from "react-intl";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {Collapse, Tooltip} from "@mui/material";

import {Data, IHeadCell} from "../Table/types";
import {EnhancedTableProps} from "./types";
import SearchInput from "../SearchInput";

const TABLE_HEAD: IHeadCell[] = [
    {
        label: 'Name',
        id: 'name',
        tooltip: 'tooltip_name'
    },
    {
        label: 'Full Name',
        id: 'fullName',
        tooltip: 'tooltip_fullName'
    },
    {
        label: 'Date',
        id: 'date',
        tooltip: 'tooltip_date'
    },
    {
        label: 'Population',
        id: 'population',
        tooltip: 'tooltip_population'
    },
    {
        label: 'Size (km²)',
        id: 'square',
        tooltip: 'tooltip_square'
    },
]

const TableHeadInfo: FC<EnhancedTableProps> = ({
                                                   onFilterState,
                                                   orderBy,
                                                   order,
                                                   onRequestSort
                                               }): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <Tooltip title={<FormattedMessage id='search_window'/>}>
                    <TableCell sx={{width: '100px', backgroundColor: 'coral'}}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <SearchOffIcon/> : <SearchIcon/>}
                        </IconButton>
                    </TableCell>
                </Tooltip>
                {TABLE_HEAD.map((headCell: IHeadCell) => (
                    <Tooltip key={headCell.tooltip} title={<FormattedMessage id={headCell.tooltip}/>}>
                        <TableCell key={headCell.id} sx={{width: '500px', backgroundColor: 'coral'}} align="left">
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                <FormattedMessage id={headCell.id}/>
                                {orderBy === headCell.id && (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                )}
                            </TableSortLabel>
                        </TableCell>
                    </Tooltip>
                ))}
            </TableRow>
            {isOpen && (<TableRow>
                <TableCell/>
                {TABLE_HEAD.map(headSearch => (
                    <TableCell key={headSearch.id}>
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <SearchInput onFilterState={onFilterState} fieldId={headSearch.id}/>
                        </Collapse>
                    </TableCell>
                ))}
            </TableRow>)}
        </TableHead>
    );
};

export default TableHeadInfo;
