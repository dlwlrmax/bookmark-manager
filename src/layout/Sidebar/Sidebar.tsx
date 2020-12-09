import 'antd/dist/antd.css';
import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { getUnique } from '../../hooks/getUnique';
import styled from 'styled-components';
import { FormOutlined, HeartOutlined } from '@ant-design/icons';
import CollectionContext from '../../context/CollectionContext';
import Item from './Item/Item';
const BOOKMARKS_QUERY = gql`
    {
        bookmarks {
            data {
                collection
            }
        }
    }
`;

const SidebarWrapper = styled.div`
    background-color: #2b2b2b;
    height: 100vh;
    color: #dedede;
    width: 100%;
`;

const Container = styled.div`
    width: 90%;
    margin: 30px auto;
    &.title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
            font-size: 1.2em;
        }
    }
`;

const Group = styled.div`
    &.group-item {
        display: flex;
        align-items: center;
        div {
            padding-left: 20px;
        }
    }
    transition: 0.3s all ease;

    &:hover {
        cursor: pointer;
        transform: translate(10px);
    }
    &.active {
        color: lightblue;
    }
`;

const StyledLabel = styled.div`
    margin-top: 30px;
    color: #9e9e9e;
`;

const CollectionContainer = styled.ul`
    list-style: none;
    padding: 0px;
    font-size: 1.05em;
`;

export const Sidebar = () => {
    const { error, data, loading } = useQuery(BOOKMARKS_QUERY);
    const { collection, setCollection } = useContext(CollectionContext);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <SidebarWrapper>
            <Container className='title-wrapper'>
                <div className='title'>Bookmark Manager</div>
            </Container>
            <Container>
                <Group className={collection === '' ? 'active group-item' : 'group-item'}>
                    {collection === '' ? <HeartOutlined /> : <FormOutlined />}

                    <div
                        onClick={() => {
                            setCollection('');
                        }}>
                        All Bookmark ({data.bookmarks.data.length})
                    </div>
                </Group>
                <StyledLabel>My Collections: </StyledLabel>
                <CollectionContainer>
                    {getUnique(data.bookmarks.data).map((item: string, index: number) => {
                        return <Item item={item} key={index} />;
                    })}
                </CollectionContainer>
            </Container>
        </SidebarWrapper>
    );
};
