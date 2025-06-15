import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

interface ToastOptions {
  position?:
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';
  className?: string;
  bodyClassName?: string;
  closeButton?: boolean;
  autoClose?: number | false;
  hideProgressBar?: boolean;
}

export const convertToTitleCase = (str: string) => {
  if (str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .split('_')
      .join(' ');
  } else {
    return '';
  }
};

const ToastContent = ({ title }: { title: string }) => (
  <Box className="w-full flex items-center justify-between gap-3">
    <Box component="div">
      <p className="font-sm text-black">{convertToTitleCase(title)}</p>
    </Box>
    <CloseIcon
      onClick={() => toast.dismiss()}
      className="ml-auto text-gray-400 cursor-pointer hover:text-white"
    />
  </Box>
);

export const toastSuccess = (title: string | undefined | null): void => {
  if (!title) return;

  toast.success(<ToastContent title={title} />, {
    position: 'top-center',
    className: 'rounded-lg shadow-lg',
    bodyClassName: 'flex items-center',
    closeButton: false,
    autoClose: 5000,
    hideProgressBar: true
  } as ToastOptions);
};

export const toastError = (title: string | undefined | null): void => {
  if (!title) return;

  toast.error(<ToastContent title={title} />, {
    position: 'top-center',
    className: 'rounded-lg shadow-lg',
    bodyClassName: 'flex items-center',
    closeButton: false,
    autoClose: 5000,
    hideProgressBar: true
  } as ToastOptions);
};
