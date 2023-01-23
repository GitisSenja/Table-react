// @ts-ignore
import ReactToPdf from 'react-to-pdf'
import React, {useEffect, useRef, useState} from 'react';
import {DownloadTableExcel} from 'react-export-table-to-excel';

import {ReactComponent as LogoXLS} from '../../assets/xls.svg';
import {ReactComponent as LogoPDF} from '../../assets/pdf.svg';

const DownloadFile = ({content}: any): JSX.Element => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const xlsRef = useRef(null);
    const pdfRef = useRef<any>(null);

    useEffect(() => {
        setWidth(pdfRef?.current?.clientWidth);
        setHeight(pdfRef?.current?.clientHeight);
    }, []);

    return (
        <>
            <div style={{margin: '20px 0'}}>
                <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={xlsRef.current}
                >
                    <LogoXLS style={{width: '50px', height: '50px'}}/>
                </DownloadTableExcel>
                <ReactToPdf options={{
                    orientation: 'c',
                    unit: 'pt',
                    format: [height, width],
                    putOnlyUsedFonts: false,
                    floatPrecision: 'smart',
                }} targetRef={pdfRef} filename="div-blue.pdf">
                    {({toPdf}: any) => (
                        <LogoPDF style={{width: '50px', height: '50px'}} onClick={toPdf}/>
                    )}
                </ReactToPdf>
            </div>
            {content &&
            <div ref={pdfRef} style={{width: '100%', height: '100vh'}}>
                {content(xlsRef)}
            </div>}
        </>
    );
}

export default DownloadFile;
