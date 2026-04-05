// import React from 'react';

// App.tsx의 자식 요소를 보여줄 Outlet 선언 필요
// Outlet 역할: 

import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default HomePage;