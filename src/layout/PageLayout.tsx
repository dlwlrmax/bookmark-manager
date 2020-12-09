import React from 'react';
import MainContent from './MainContent/MainContent';
import { Sidebar } from './Sidebar/Sidebar';
import styled from 'styled-components';

const Layout = styled.div`
    display: flex;
    .sidebar-container {
        width: 20%;
    }
    .main-content-container {
        width: 80%;
    }
`;
export const PageLayout = () => {
    return (
        <Layout className='Layout'>
            <Layout className='sidebar-container'>
                <Sidebar />
            </Layout>
            <Layout className='main-content-container'>
                <MainContent />
            </Layout>
        </Layout>
    );
};
