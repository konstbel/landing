import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    TextInput,
    Create,
    SimpleForm,
    Edit
} from 'react-admin';

export const PostsList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <TextField source="body" />
        </Datagrid>
    </List>
);
export const CreatePost = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <TextInput  source="body" multiline/>
        </SimpleForm>
    </Create>
);
export const EditPost = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput  source="body" multiline />
        </SimpleForm>
    </Edit>
);
