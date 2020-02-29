import React                             from 'react';
import {fetchUtils, Admin, Resource}     from 'react-admin';
import {PostsList, CreatePost} from './posts';
import {CreateMessage, MessagesList}                   from './messages';
import jsonServerProvider                from 'ra-data-json-server';
import authProvider                      from './authProvider';
import polyglotI18nProvider              from 'ra-i18n-polyglot';
import russianMessages                   from 'ra-language-russian';


russianMessages['ra']['page']['empty'] = 'Ничего не найдено';
russianMessages['ra']['page']['invite'] = '';
russianMessages['ra']['notification']['not_found'] = 'Не найдено';

const messages     = {
    ru: {
        ...russianMessages,
        ...{
            resources: {
                post: {
                    name  : 'Емейл |||| Емейлы',
                    fields: {
                        body : 'Текст',
                        title: 'Заголовок',
                        createdAt: 'Дата и время',
                    },
                },
                message: {
                    name  : 'Пуш-уведомление |||| Пуш-уведомления',
                    fields: {
                        body : 'Текст',
                        createdAt: 'Дата и время',
                    },
                },
            },
            page: {
                empty: 'Нет ничего'
            }
        },
    }
};
const httpClient   = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};
const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'ru');
const dataProvider = jsonServerProvider('http://localhost:4000', httpClient);
const App          = () => (
    <Admin title="Админка"
           i18nProvider={i18nProvider}
           dataProvider={dataProvider}
           authProvider={authProvider}>
        <Resource name="post" list={PostsList} create={CreatePost}/>
        <Resource name="message" list={MessagesList} create={CreateMessage}/>
    </Admin>
);

export default App;
