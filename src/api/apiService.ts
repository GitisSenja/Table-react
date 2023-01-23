import {format} from 'fecha';

import countriesMokeJson from "./moke.json";
import {ICountryInfo} from "../types";

export const getCountryByName = async () => {
    return new Promise((resolve) => {
        setTimeout(resolve, getRandomNumber(100, 800));
    }).then(() => getFormattedCountry(countriesMokeJson));
}

const getFormattedCountry = (countries: any) :ICountryInfo[] =>  {
    return countries.map((country: any) => ({
        name:country.name,
        fullName: country.fullName,
        id: `id${Math.random().toString(16).slice(2)}`,
        date: format(new Date(getRandomNumber(900, 2000),getRandomNumber(1, 12),getRandomNumber(1, 30)), 'YYYY-MM-DD'),
        square: getRandomNumber(5000, 10000),
        population: getRandomNumber(5000, 10000),
        history: {
            id:`id${Math.random().toString(16).slice(2)}`,
            flag: country.flag,
            create: 'Каждая республика – участник договора – является\n' +
                'суверенным государством. Союз Советских Суверенных Республик (СССР) –\n' +
                'суверенное федеративное демократическое государство, образованное в\n' +
                'результате объединения равноправных республик и осуществляющее\n' +
                'государственную власть в пределах полномочий, которыми его добровольно\n' +
                'наделяют участники договора.',
            yearsAgo: getRandomNumber(5000, 10000),
        }
    }))
}

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


