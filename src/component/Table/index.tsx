import React, {FC, useEffect, useState} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {TablePagination, Tooltip} from "@mui/material";
import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import {FormattedMessage} from "react-intl";

import {TableProps, Order, Data} from "./types";
import {ICountryInfo} from "../../types";
import {getComparator, stableSort} from "../../utils/sorting";
import {getCountryByName} from "../../api/apiService";
import Row from "../Row";
import TableHeadInfo from "../TableHeadInfo";
import TablePaginationActions from "../TablePagination";

const TableCountry: FC<TableProps> = ({tableRef}): JSX.Element => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [filterMap, setFilterMap] = React.useState<Record<string, string>>({});
    const [countries, setCountries] = useState<ICountryInfo[]>([])
    const [countriesApi, setCountriesApi] = useState<ICountryInfo[]>([])

    const getCountry = async () => {
        const data = await getCountryByName()
        setCountriesApi(data)
        setCountries(data)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleFilterState = (value: string, fieldId: string) => {
        const newFilter = {...filterMap, [fieldId]: value}
        if (value === '') {
            delete newFilter[fieldId]
        }
        setFilterMap(newFilter)
    };

    const getFilteredCountries = () => {
        const filteredCountriesApi = countriesApi.filter((item: any) => {
            let result = false
            let isSearched = true

            if (Object.keys(filterMap).length === 0) {
                return true
            }

            Object.keys(filterMap).forEach(filter => {
                if (String(item[filter]).toLowerCase().indexOf(filterMap[filter].toLowerCase()) !== -1 && isSearched) {
                    result = true
                } else {
                    result = false
                    isSearched = false
                }
            })
            return result
        })
        setCountries(filteredCountriesApi)
    }

    useEffect(() => {
        if (countriesApi.length > 0) {
            getFilteredCountries()
        }
    }, [filterMap])

    useEffect(() => {
        getCountry()
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table ref={tableRef} aria-label="collapsible table">
                    <TableHeadInfo
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        onFilterState={handleFilterState}
                    />
                    <TableBody>
                        {countries && stableSort(countries as ICountryInfo[], getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((country: ICountryInfo) => (
                                <Row key={country.id} row={country}/>
                            ))}
                    </TableBody>
                <TableFooter>
                    <TableRow>
                        <Tooltip title={<FormattedMessage id='page_navigation'/>}>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={3}
                                count={countries.length}
                                labelRowsPerPage={<FormattedMessage id='rows_per_page'/>}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </Tooltip>
                    </TableRow>
                </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default TableCountry;
