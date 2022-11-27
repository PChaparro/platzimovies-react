import { toast } from 'react-toastify';

export const useNotification = () => {
  const configs = { position: 'top-right', autoClose: 2500, closeOnClick: true, theme: 'colored' };

  const triggerSuccessNotification = (message) => {
    toast.success(message, configs);
  };

  const triggerErrorNotification = (message) => {
    toast.error(message, configs);
  };

  const triggerWarningNotification = (message) => {
    toast.warning(message, configs);
  };

  return { triggerErrorNotification, triggerSuccessNotification, triggerWarningNotification };
};
