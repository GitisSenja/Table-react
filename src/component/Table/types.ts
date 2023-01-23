export interface TableProps {
    tableRef: any
}

export interface Data {
    name: string;
    fullName: string;
    date: string;
    population: number;
    square: number;
}

export interface IHeadCell {
    id: keyof Data;
    label: string;
    tooltip: string
}

export type Order = 'asc' | 'desc';
