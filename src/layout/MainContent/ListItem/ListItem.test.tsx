import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ListItem from './ListItem';

describe('<ListItem />', () => {
    it('render  correctly', () => {
        const data = [
            {
                _id: '121',
                title: 'Title',
                url: 'https://www.example.com',
                collection: 'test collection',
            },
        ];
        const mocks: [] = [];
        render(
            <MockedProvider mocks={mocks}>
                <ListItem data={data} collection='' />
            </MockedProvider>
        );
        expect(screen.getByText(/title/i)).toBeInTheDocument();
        expect(screen.getByText(/https:\/\/www.example.com/i)).toBeInTheDocument();
    });
});
