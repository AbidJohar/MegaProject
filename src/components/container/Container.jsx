// Container.js
import React from 'react';

const Container = ({ children }) => {
    return <div className="h-screen w-screen overflow-auto mx-auto flex flex-col items-center justify-center p-4">
        {children}
    </div>;

};

export default Container;
