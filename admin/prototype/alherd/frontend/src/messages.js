import {Create, Datagrid, List, RichTextField, SimpleForm, DateField} from "react-admin";
import RichTextInput                                       from "ra-input-rich-text";
import React                                               from "react";

export const MessagesList = props => (
    <List {...props} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick="show">
            <RichTextField source="body"/>
            <DateField source="createdAt" locales="ru-RU" showTime/>
        </Datagrid>
    </List>
);

export const CreateMessage = (props) => (
    <Create {...props}>
        <SimpleForm>
            <RichTextInput source="body"
                           toolbar={[['bold', 'italic', 'underline'], ['link']]}/>
        </SimpleForm>
    </Create>
);
