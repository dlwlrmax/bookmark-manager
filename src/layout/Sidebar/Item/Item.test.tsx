import { render, screen } from '@testing-library/react';
import React from 'react';
import CollectionContext from '../../../context/CollectionContext';
import Item from './Item';
describe('<Item />', () => {
    it('render correctly', () => {
        const context = {
            collection: ' abc',
            setCollection: () => {},
        };
        render(
            <CollectionContext.Provider value={context}>
                <Item item={'bbq'} />
            </CollectionContext.Provider>
        );
        expect(screen.getByText('bbq')).toBeInTheDocument();
        expect(screen.getByRole('listitem').classList.contains('active')).toBeFalsy();
    });
    it('render active element', () => {
        const context = {
            collection: 'abc',
            setCollection: () => {},
        };
        render(
            <CollectionContext.Provider value={context}>
                <Item item='abc' />
            </CollectionContext.Provider>
        );
        expect(screen.getByText('abc')).toBeInTheDocument();
        expect(screen.getByRole('listitem').classList.contains('active')).toBeTruthy();
    });
});
