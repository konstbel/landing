import React                             from 'react';
import {fetchUtils, Admin, Resource}     from 'react-admin';
import {PostsList, CreatePost, EditPost} from './posts';
import jsonServerProvider                from 'ra-data-json-server';
import authProvider                      from './authProvider';
import polyglotI18nProvider              from 'ra-i18n-polyglot';
import russianMessages                   from 'ra-language-russian';


const messages     = {
    ru: {
        ...russianMessages,
        ...{
            resources: {
                post: {
                    name  : 'Пост |||| Посты',
                    fields: {
                        body : 'Текст',
                        title: 'Заголовок',
                    },
                },
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
        <Resource name="post" list={PostsList} create={CreatePost} edit={EditPost}/>
    </Admin>
);

export default App;
