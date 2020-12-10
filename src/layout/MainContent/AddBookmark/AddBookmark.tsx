import 'antd/dist/antd.css';
import { Button, Form, Modal, Input } from 'antd';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/react-hooks';

const GET_BOOKMARK = gql`
    {
        bookmarks {
            data {
                title
                url
                collection
            }
        }
    }
`;

const CREATE_ITEM = gql`
    mutation CreateBookmark($data: BookmarkInput!) {
        createBookmark(data: $data) {
            title
            collection
            url
        }
    }
`;

export default function AddBookmark() {
    const [form] = Form.useForm();
    const [isAddModalVisible, setAddNewVisible] = useState<boolean>(false);
    const [createBookmark] = useMutation(CREATE_ITEM, {
        refetchQueries: [{ query: GET_BOOKMARK }],
    });

    const handleAddNewCancel = () => {
        setAddNewVisible(false);
    };

    return (
        <>
            <Button
                onClick={() => {
                    setAddNewVisible(true);
                }}>
                Add
            </Button>
            <Modal
                title='Add new Bookmark'
                visible={isAddModalVisible}
                okText='Create'
                cancelText='Cancel'
                onCancel={handleAddNewCancel}
                onOk={() =>
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            createBookmark({ variables: { data: { title: values.title, url: values.url, collection: values.collection } } });
                            setAddNewVisible(false);
                        })
                        .catch(e => {
                            console.log('Validate failed:', e);
                        })
                }>
                <Form form={form} layout='vertical'>
                    <Form.Item name='url' label='Url' rules={[{ required: true, message: 'Please input url' }]}>
                        <Input placeholder='https://www.example.com' />
                    </Form.Item>
                    <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Please input Title' }]}>
                        <Input placeholder='example.com' />
                    </Form.Item>
                    <Form.Item name='collection' label='Collection' rules={[{ required: true, message: 'Please input collection' }]}>
                        <Input placeholder='Collection 1' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
