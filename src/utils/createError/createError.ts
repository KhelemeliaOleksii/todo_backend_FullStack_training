import errorMessages from './errorMessages';
import TError from './errorType';


const createError = ({
  status,
  messageProd = errorMessages[status],
  messageDev = messageProd,
}: {
  status: number;
  messageProd?: string;
  messageDev?: string;
}): TError => {
  let message = '';
  const {NODE_ENV = "production"} = process.env;
  if (NODE_ENV === 'production') {
    message = messageProd;
  }
  if (NODE_ENV === 'development') {
    message = messageDev;
  }

  const error: TError = new Error(message);
  error.status = status;
  return error;
};

export default createError;
