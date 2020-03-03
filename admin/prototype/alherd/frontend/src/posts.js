import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    TextInput,
    Create,
    SimpleForm,
    RichTextField,
    DateField,
    required
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

export const PostsList = props => (
    <List {...props} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <RichTextField source="body" />
            <DateField source="createdAt" locales="ru-RU" showTime/>
        </Datagrid>
    </List>
);
export const CreatePost = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" validation={{ required: true }}/>
            <RichTextInput validate={[required()]}
                           source="body"
                           toolbar={[ ['bold', 'italic', 'underline'], ['link', 'image', 'code-block'] ]}/>
        </SimpleForm>
    </Create>
);
