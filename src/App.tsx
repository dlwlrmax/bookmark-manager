import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { PageLayout } from './layout/PageLayout';
function App() {
    return (
        <ApolloProvider client={client}>
            <PageLayout />
        </ApolloProvider>
    );
}

export default App;
