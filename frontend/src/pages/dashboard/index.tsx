import React, { useEffect, useState } from 'react';
import { AddExpenseForm, CategoryCard } from '../../components';
import { Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesErrorCode, getCategoriesSuccessCode, getCategorySpendingData, getSelectedMonth } from '../../services/redux/selectors';
import { fetchCategoriesRequest, fetchCategorySpendingRequest, resetCategoryState } from '../../services/redux/slices';
import { useToastMessage } from '../../hooks';



const Dashboard: React.FC = () => {
    const dispatch = useDispatch()
    const categories = useSelector(getCategorySpendingData)
    const month = useSelector(getSelectedMonth)
    const errorMsg = useSelector(getCategoriesErrorCode);
    const successMsg = useSelector(getCategoriesSuccessCode);
    const [isExpenseOpen, setIsExpenseOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCategoriesRequest());
        handleCategorySpend()
    }, [])

    const successFunction = () => {
        if (['EXPENSE_CREATED'].includes(successMsg)) {
            handleCategorySpend()

        }
    }

    useToastMessage({ errorMsg, successMsg,successFunction, resetFunction: resetCategoryState })


    const handleCategorySpend = () => {
        const payload: any = { month }

        dispatch(fetchCategorySpendingRequest(payload))
    }

    return (
        <div className="flex flex-col min-h-screen bg-blue-200 relative">
            <div className="container mx-auto mt-8 mb-8 flex-1 px-4">
                {categories?.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    {categories?.map((item: any) => (
                        <CategoryCard key={item.id} item={item} />
                    ))}
                </div>
                    : <div className='w-full min-h-screen flex items-center justify-center'> <Typography className='text-black text-[26px]'>No Items Found</Typography> </div>}
            </div>

            {/* Floating Add Expense Button */}
            <Fab
                color="primary"
                aria-label="add"
                className="fixed bottom-6 right-6 border bg-blue-800 text-white"
                onClick={() => setIsExpenseOpen(true)}
            >
                <AddIcon />
            </Fab>

            {/* Add Expense Modal */}
            <AddExpenseForm
                open={isExpenseOpen}
                onClose={() => setIsExpenseOpen(false)}
            />
        </div>
    );
};

export default Dashboard;
