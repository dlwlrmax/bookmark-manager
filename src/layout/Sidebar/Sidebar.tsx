import 'antd/dist/antd.css';
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { getUnique } from '../../hooks/getUnique';
import styled from 'styled-components';
import { FolderOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
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
        div {
            padding-left: 20px;
        }
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

const CollectionGroup = styled.li`
    display: flex;
    align-items: center;
    margin: 10px auto;
    div {
        padding-left: 10px;
        text-transform: capitalize;
    }
`;
export const Sidebar = () => {
    const { error, data, loading } = useQuery(BOOKMARKS_QUERY);
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
                <div className='icon'>
                    <PlusOutlined />
                </div>
            </Container>
            <Container>
                <Group className='group-item'>
                    <FormOutlined />
                    <div>All Bookmark ({data.bookmarks.data.length})</div>
                </Group>
                <StyledLabel>My Collections: </StyledLabel>
                <CollectionContainer>
                    {getUnique(data.bookmarks.data).map((item: string, index: number) => {
                        return (
                            <CollectionGroup key={index}>
                                <FolderOutlined />
                                <div>{item}</div>
                            </CollectionGroup>
                        );
                    })}
                </CollectionContainer>
            </Container>
        </SidebarWrapper>
    );
};
