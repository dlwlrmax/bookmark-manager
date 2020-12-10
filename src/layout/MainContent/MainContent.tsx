import React, { useContext } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import AddBookmark from './AddBookmark/AddBookmark';
import CollectionContext from '../../context/CollectionContext';
import ListItem from './ListItem/ListItem';

const StyledHeader = styled.div`
    width: 100%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
`;
const Container = styled.div`
    width: 80%;
    margin: 0 auto;
    color: #272727;
`;

const Title = styled.div`
    font-size: 1.8em;
    font-weight: 600;
    color: #272727;
    text-transform: capitalize;
`;

export const GET_BOOKMARK = gql`
    {
        bookmarks {
            data {
                _id
                title
                url
                collection
            }
        }
    }
`;

export default function MainContent() {
    const { data, loading, error } = useQuery(GET_BOOKMARK);
    const { collection } = useContext(CollectionContext);

    if (loading) {
        return <div>loading</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <Container>
            <StyledHeader>
                <div>
                    <Title>{collection ? collection : 'All bookmark'}</Title>
                </div>
                <AddBookmark />
            </StyledHeader>

            <hr />
            <ListItem data={data.bookmarks.data} collection={collection} />
        </Container>
    );
}
