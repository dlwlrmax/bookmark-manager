import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DeleteBookmark from '../DeleteBookmark/DeleteBookmark';

const Item = styled.div`
    display: flex;
    margin: 30px 0;
    justify-content: space-between;
    align-items: center;
    .content {
        display: flex;
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
    }
`;
const ListContainer = styled.div``;

interface BOOKMARK {
    _id?: string;
    title: string;
    url: string;
    collection: string;
}
type Props = {
    data: BOOKMARK[];
    collection: string;
};

export default function ListItem({ data, collection }: Props) {
    const [bookmark, setBookmark] = useState<BOOKMARK[]>(data);
    useEffect(() => {
        if (collection) {
            let result = data.filter(item => item.collection.toLowerCase() === collection.toLowerCase());
            setBookmark(result);
        } else {
            setBookmark(data);
        }
    }, [collection, data]);
    return (
        <ListContainer>
            {bookmark.map((item: any, index: number) => {
                return (
                    <Item key={index}>
                        <div className='content'>
                            <div className='favicon'>
                                <img src={`${item.url.match(/^https?:\/\/[^#?/]+/)}/favicon.ico`} alt='' width={32} />
                            </div>
                            <div className='info'>
                                <div className='title'>{item.title}</div>
                                <a href={item.url} target='_blank' rel='noreferrer' className='url'>
                                    {item.url}
                                </a>
                            </div>
                        </div>
                        {item._id ? (
                            <div className='icon'>
                                <DeleteBookmark id={item._id} />
                            </div>
                        ) : (
                            <div>null</div>
                        )}
                    </Item>
                );
            })}
        </ListContainer>
    );
}
