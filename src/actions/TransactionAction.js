/*eslint-disable*/
import { transactionConstants, alertConstants } from './ActionType';
import { performTransaction, getTransactionsList } from '../services/user.service';

export const submitTransation = (transaction, id) => {
  return dispatch => {
    performTransaction(transaction, id)
      .then(resp => {
          dispatch({ type: transactionConstants.TRANSACTION_SUCCESS, transaction: resp.transaction });
        },
        err => {
          let message = '';
          if(err.response && err.response.data.error) {
            message = err.response.data.message;
          } else {
            message = err.message;
          }
          dispatch({ type: alertConstants.ERROR, message });
        }
    );
  };
};


export const getTransactions = (id) => {
  return dispatch => {
    getTransactionsList(id)
      .then(resp => {
          dispatch({ type: transactionConstants.GET_TRANSACTIONS, transactions: resp.transactions });
        },
        err => {
          let message = '';
          if(err.response && err.response.data.error) {
            message = err.response.data.message;
          } else {
            message = err.message;
          }
          dispatch({ type: alertConstants.ERROR, message });
        }
    );
  };
};
