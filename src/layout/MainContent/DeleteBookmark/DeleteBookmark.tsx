import { DeleteOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Modal } from 'antd';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
const { confirm } = Modal;

const DELETE_ITEM = gql`
    mutation DeleteBookmark($id: ID!) {
        deleteBookmark(id: $id) {
            _id
        }
    }
`;

const GET_BOOKMARK = gql`
    {
        bookmarks {
            data {
                title
                collection
                url
            }
        }
    }
`;

type Props = {
    id: string;
};
export default function DeleteBookmark({ id }: Props) {
    const [deleteBookmark, { loading }] = useMutation(DELETE_ITEM, {
        refetchQueries: [{ query: GET_BOOKMARK }],
    });
    function showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteBookmark({ variables: { id: id } });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    return (
        <div className='container'>
            {loading ? (
                <LoadingOutlined />
            ) : (
                <Button type='text' onClick={showDeleteConfirm}>
                    <DeleteOutlined />
                </Button>
            )}
        </div>
    );
}
