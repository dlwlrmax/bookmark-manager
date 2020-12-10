import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { PageLayout } from './layout/PageLayout';
import CollectionContext from './context/CollectionContext';
function App() {
    const [collection, setCollection] = useState<string>('');
    return (
        <CollectionContext.Provider value={{ collection: collection, setCollection: setCollection }}>
            <ApolloProvider client={client}>
                <PageLayout />
            </ApolloProvider>
        </CollectionContext.Provider>
    );
}

export default App;
