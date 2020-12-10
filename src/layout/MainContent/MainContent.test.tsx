import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import CollectionContext from '../../context/CollectionContext';

import MainContent, { GET_BOOKMARK } from './MainContent';

describe('<MainContent />', () => {
    it('render correctly', async () => {
        const mocks = [
            {
                request: {
                    query: GET_BOOKMARK,
                },
                result: {
                    data: {
                        bookmarks: {
                            data: [
                                {
                                    _id: '121',
                                    title: 'Title',
                                    url: 'https://www.example.com',
                                    collection: 'test collection',
                                },
                            ],
                        },
                    },
                },
            },
        ];
        const context = {
            collection: ' abc',
            setCollection: () => {},
        };
        render(
            <MockedProvider mocks={mocks}>
                <CollectionContext.Provider value={context}>
                    <MainContent />
                </CollectionContext.Provider>
            </MockedProvider>
        );
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        const mainTitle = await waitFor(() => screen.getByText(/abc/));
        expect(mainTitle).toBeInTheDocument();
    });
});
