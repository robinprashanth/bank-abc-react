import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import _ from 'lodash';
import { transactionConstants } from '../src/actions/ActionType';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Users data list
const users = [];

// Auto increment ids
let autoId = 1;
let transId = 1;

// Seed first user
const firstUser = {
  id: autoId,
  firstName: 'test',
  lastName: 'user',
  email: 'test@gmail.com',
  password: 'test',
  transactions: []
};

users.push(firstUser);

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', (req, res) => {
  if (req.body) {
    const user = req.body;
    const index = _.findIndex(users, { email: user.email });
    if (index > -1) {
      res.status(403).send({ error: true, message: 'User already exist' });
    } else {
      autoId += 1;
      Object.assign(user, { id: autoId, transactions: [] });
      users.push(user);
      res.status(200).send({ error: false, message: 'User created successfully', body: {} });
    }
  } else {
    res.status(400).send({ error: true, message: 'bad request' });
  }
});

app.post('/login', (req, res) => {
  if (req.body) {
    const user = req.body;
    const index = _.findIndex(users, { email: user.email, password: user.password });
    if (index > -1) {
      res.status(200).send({ error: false, message: 'login success', body: { user: users[index] } });
    } else {
      res.status(401).send({ error: true, message: 'User not authorised' });
    }
  }
});

app.post('/transaction/:id', (req, res) => {
  if (req.body) {
    const transaction = req.body;
    const index = _.findIndex(users, { id: parseInt(req.params.id) });
    if (index > -1) {
      transId += 1;
      transaction['id'] = transId;
      console.log(`${transaction}  and id --- ${users[index]}`);
      const transactionObj = _(users[index].transactions)
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
      if(transaction.type === 'cr') {
        transaction['totalBalance'] = balance + transaction.amount;
      } else {
        transaction['totalBalance'] = balance - transaction.amount;
      }

      users[index].transactions.push(transaction)
      res.status(200).send({ error: false, message: 'deposit success', body: { transaction } });
    } else {
      res.status(401).send({ error: true, message: 'User not authorised' });
    }
  }
});

app.get('/transaction/:id', (req, res) => {
  if (req.params.id) {
    const index = _.findIndex(users, { id: parseInt(req.params.id) });
    if (index > -1) {
      res.status(200).send({ error: false, message: 'retreive trasnsaction success', body: { transactions: users[index].transactions } });
    } else {
      res.status(401).send({ error: true, message: 'User not authorised' });
    }
  } else {
    res.status(400).send({ error: true, message: 'no transactions found' });
  }
});



app.get('/users', (req, res) => res.send({ error: false, body: { users } }));

app.listen(3500, () => console.log('App listening on port 3000!'));
