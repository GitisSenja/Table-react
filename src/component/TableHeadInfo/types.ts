import React from "react";

import {Data, Order} from "../Table/types";

export interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    onFilterState: any
}
