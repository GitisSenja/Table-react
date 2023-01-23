import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

import {IAdditionalInformationProps} from "./types"

const RowDescription: FC<IAdditionalInformationProps> = ({isOpen, history}) => {
    return (
        <TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Box sx={{margin: 1}}>
                        <Typography variant="h6" gutterBottom component="div">
                            History
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Creat</TableCell>
                                    <TableCell align="center">Years ago</TableCell>
                                    <TableCell align="center">Flag</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={history.id}>
                                    <TableCell sx={{width: '600px'}}
                                               align="left"
                                               component="th"
                                               scope="row">
                                        {history.create}
                                    </TableCell>
                                    <TableCell align="center">{history.yearsAgo} years</TableCell>
                                    <TableCell align="center" sx={{width: '300px'}}>
                                        <img style={{width: '200px'}}
                                             src={history.flag}
                                             alt='Flag'/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export default RowDescription;
