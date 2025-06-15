import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { UnknownAction } from 'redux-saga';
import { toastError, toastSuccess } from '../../components';


interface UseToastMessageProps {
  errorMsg?: string | null;
  successMsg?: string | null;
  resetFunction?: () => UnknownAction;
  successFunction?: () => void;
  errorFunction?: () => void;
  isToastSuccess?: boolean;
  isToastError?: boolean;
  successVar?: unknown;
  errorVar?: unknown;
}

export const useToastMessage = ({
  errorMsg,
  successMsg,
  resetFunction = () => ({ type: 'NO_ACTION' }) as const,
  successFunction = () => { },
  errorFunction = () => { },
  isToastSuccess = true,
  isToastError = true,

}: UseToastMessageProps): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (successMsg) {
      if (isToastSuccess) toastSuccess(successMsg);
      successFunction();
    }
    if (errorMsg !== 'E-10003') {
      if (isToastError) toastError(errorMsg);
      errorFunction();
    }

    let timeout = setTimeout(() => dispatch(resetFunction()), 500);
    return () => clearTimeout(timeout)
  }, [successMsg, errorMsg]);
};

