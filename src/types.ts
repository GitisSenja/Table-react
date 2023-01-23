export interface ICountryInfo {
    id: number,
    name: string,
    fullName: string,
    square: number,
    date: string,
    population: number,
    history: IHistory
}

export interface IHistory {
    create: string,
    yearsAgo: number,
    flag: string,
    id: string,
}
