import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Button
} from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { submitTransation, getTransactions } from '../../actions/TransactionAction';
import { error, clear } from '../../actions/AlertAction';

import './Dashboard.scss';

const columns = [{
  Header: 'Descripton',
  accessor: 'description' // String-based value accessors!
}, {
  Header: 'Date',
  accessor: 'date',
  Cell: row => (
    <div>
      {moment(row.original.date).format('YYYY-MM-DD HH:mm')}
    </div>
  )
}, {
  Header: 'Deposit',
  accessor: 'type',
  Cell: row => (
    <div>
      {row.original.type === 'cr' && <span> {row.original.amount}</span>}
    </div>
  )
},
{
  Header: 'Withdraw',
  accessor: 'amount',
  Cell: row => (
    <div>
      {row.original.type === 'dr' && <span> {row.original.amount}</span>}
    </div>
  )
},
{
  Header: 'Balance',
  accessor: 'totalBalance'
}];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      depositAmount: '',
      withdrawAmount: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.depositAmt = this.depositAmt.bind(this);
    this.withdrawAmt = this.withdrawAmt.bind(this);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(getTransactions(user.id));
  }

  handleChange(event) {
    const { name, value } = event.target;
    if (isNaN(value) || (value === '')) {
      this.setState({ [name]: '' });
    } else {
      this.setState({ [name]: value });
    }
  }

  depositAmt() {
    const { dispatch, user } = this.props;
    const { depositAmount } = this.state;
    if (!isNaN(depositAmount)) {
      const value = parseFloat(depositAmount);
      if (value > 0) {
        const transaction = {
          type: 'cr',
          amount: value,
          date: new Date(),
          description: 'Deposited Amount'
        };
        dispatch(submitTransation(transaction, user.id));
      }
    }
    this.setState({ depositAmount: '' });
  }

  withdrawAmt() {
    const { dispatch, user, balance } = this.props;
    const { withdrawAmount } = this.state;
    if (!isNaN(withdrawAmount)) {
      const value = parseFloat(withdrawAmount);
      if (value > 0 && value < balance) {
        const transaction = {
          type: 'dr',
          amount: value,
          date: new Date(),
          description: 'Withdraw Amount'
        };
        dispatch(submitTransation(transaction, user.id));
        dispatch(clear());
      } else {
        dispatch(error('check your withdrawal limit'));
      }
    }
    this.setState({ withdrawAmount: '' });
  }

  render() {
    const { depositAmount, withdrawAmount } = this.state;
    const { transactions, balance, alert } = this.props;
    return (
      <div>
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Deposit Amount</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="8" xs="12">
                    <Input
                      type="number"
                      id="name"
                      name="depositAmount"
                      placeholder="Enter deposit amount"
                      value={depositAmount}
                      onChange={this.handleChange}
                      required
                    />
                  </Col>
                  <Col sm="4" xs="12">
                    <Button color="primary" onClick={this.depositAmt}>Deposit</Button>{' '}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Withdraw Amount</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="8" xs="12">
                    <Input
                      type="number"
                      id="name"
                      name="withdrawAmount"
                      placeholder="Enter withdrwal amount"
                      value={withdrawAmount}
                      onChange={this.handleChange}
                      required
                    />
                  </Col>
                  <Col sm="4" xs="12">
                    <Button color="danger" onClick={this.withdrawAmt}>Withdraw</Button>{' '}
                  </Col>
                </Row>
                {alert.message &&
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card>
          <CardHeader>
            <Row>
              <Col>Summary</Col>
              <Col className="text-right">Balance: {balance}</Col>
            </Row>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={transactions}
              columns={columns}
              minRows = {0}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  const { transactions, balance } = state.transactions;
  const { alert } = state;
  return {
    user,
    transactions,
    balance,
    alert
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
