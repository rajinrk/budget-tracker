import React from 'react';
import { CircularProgress } from '@mui/material';

interface LoaderProps {
    text?: string;
    fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ text, fullScreen }) => {
    return (
        <div className={`flex justify-center items-center ${fullScreen ? 'min-h-screen' : 'min-h-[200px]'}`}>
            <CircularProgress />
            {text && <p className="mt-4">{text}</p>}
        </div>
    );
};
