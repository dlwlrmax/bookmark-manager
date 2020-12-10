import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { Sidebar, BOOKMARKS_QUERY } from './Sidebar';
import CollectionContext from '../../context/CollectionContext';
describe('<Sidebar />', () => {
    it('render correctly', async () => {
        const mocks = [
            {
                request: {
                    query: BOOKMARKS_QUERY,
                },
                result: {
                    data: {
                        bookmarks: {
                            data: [
                                {
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
                    <Sidebar />
                </CollectionContext.Provider>
            </MockedProvider>
        );
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        // await new Promise(resolve => setTimeout(resolve, 0));
        const ele1 = await waitFor(() => screen.getByText('test collection'));
        expect(ele1).toBeInTheDocument();
        const ele2 = await waitFor(() => screen.getByText('All Bookmark (1)'));
        expect(ele2).toBeInTheDocument();
    });
});
