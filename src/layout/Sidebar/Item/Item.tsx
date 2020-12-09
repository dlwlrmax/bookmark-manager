import { FolderOpenOutlined, FolderOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import styled from 'styled-components';
import CollectionContext from '../../../context/CollectionContext';
const CollectionGroup = styled.li`
    display: flex;
    align-items: center;
    margin: 10px auto;
    div {
        padding-left: 10px;
        text-transform: capitalize;
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

type Props = {
    item: string;
};
export default function Item({ item }: Props) {
    const { collection, setCollection } = useContext(CollectionContext);

    const setActiveCollection = () => {
        setCollection(item);
    };
    return (
        <CollectionGroup onClick={setActiveCollection} className={collection === item ? 'active' : ''}>
            {collection === item ? <FolderOpenOutlined /> : <FolderOutlined />}
            <div>{item}</div>
        </CollectionGroup>
    );
}
