// @ts-ignore
import React, {useState} from 'react';
import {IntlProvider} from 'react-intl'

import {LOCALES} from './i18n/locales'
import {messages} from './i18n/messages'
import TableCountry from "./component/Table";
import HeadComponent from "./component/Head";
import DownloadFile from "./component/DownloadFile";

const App = () => {
    const [locale, setLocale] = useState<string>(LOCALES.ENGLISH)

    return (
        <DownloadFile content={(tableRef: React.Ref<string>) => (
            <IntlProvider locale={locale} messages={messages[locale]} defaultLocale='en'>
                <HeadComponent language={locale} onChangeSelect={setLocale}/>
                <TableCountry tableRef={tableRef}/>
            </IntlProvider>)
        }/>
    )
}
export default App;

