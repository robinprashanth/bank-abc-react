import _ from 'lodash';
import { transactionConstants } from '../actions/ActionType';

const initialState = {
  transactions: [],
  transactionSummary: [],
  balance: 0
};

const getBalance = (trans) => {
  const transactionObj = _(trans)
  .groupBy('type')
  .map((transaction, type) => ({
    type,
    amount: _.sumBy(transaction, 'amount')
  }))
  .value();
  const withdrawTempObj = _.find(transactionObj, ['type', 'dr']);
  const depositTempObj = _.find(transactionObj, ['type', 'cr']);
  const depositAmt = depositTempObj ? depositTempObj.amount : 0;
  const withdrawAmt = withdrawTempObj ? withdrawTempObj.amount : 0;
  const balance = depositAmt - withdrawAmt;
  return balance;
};

const updateTransactionList = (state, action) => {
  const transactions = Object.assign([], state.transactions);
  transactions.push(action.transaction);
  const balance = getBalance(transactions);

  return Object.assign({}, state, { transactions, balance });
};

const getTransactions = (state, action) => {
  const balance = getBalance(action.transactions);
  return Object.assign({}, state, { transactions: action.transactions, balance });
};

export const transactions = (state = initialState, action) => {
  switch (action.type) {
    case transactionConstants.GET_TRANSACTIONS:
      return getTransactions(state, action);
    case transactionConstants.TRANSACTION_SUCCESS:
      return updateTransactionList(state, action);
    default:
      return state;
  }
};
