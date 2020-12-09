import 'antd/dist/antd.css';
import React from 'react';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
const { Search } = Input;
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

const StyledSearch = styled(Search)`
    width: 400px;
`;

const Title = styled.div`
    font-size: 1.8em;
    font-weight: 600;
    color: #272727;
`;

const ListContainer = styled.div``;
const ListItem = styled.div`
    display: flex;
    margin: 30px 0;
    .favicon {
        padding-right: 20px;
        display: flex;
        align-items: center;
    }
    .info {
        .title {
            font-weight: 600;
            font-size: 1.3em;
            color: #464646;
        }
        .url {
            font-size: 1.1em;
            color: #868686;
        }
        .url:hover {
            text-decoration: underline;
            color: #2f7cc2;
        }
    }
`;

const GET_BOOKMARK = gql`
    {
        bookmarks {
            data {
                title
                url
            }
        }
    }
`;

export default function MainContent() {
    const { data, loading } = useQuery(GET_BOOKMARK);

    return (
        <Container>
            <StyledHeader>
                <StyledSearch placeholder='Search your bookmark' size='small' />
                <Button>Add</Button>
            </StyledHeader>
            <div>
                <Title>All bookmark</Title>
            </div>
            <hr />
            {loading ? (
                <div>Loading</div>
            ) : (
                <ListContainer>
                    {data.bookmarks.data.map((item: any, index: number) => {
                        return (
                            <ListItem key={index}>
                                <div className='favicon'>
                                    <img src={`${item.url.match(/^https?:\/\/[^#?/]+/)}/favicon.ico`} alt='' width={32} />
                                </div>
                                <div className='info'>
                                    <div className='title'>{item.title}</div>
                                    <a href={item.url} target='_blank' rel='noreferrer' className='url'>
                                        {item.url}
                                    </a>
                                </div>
                            </ListItem>
                        );
                    })}
                </ListContainer>
            )}
        </Container>
    );
}
