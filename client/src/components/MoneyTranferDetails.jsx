import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const URL = "https://tsfgripbank.herokuapp.com/"

const validEmailRegex = RegExp(
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class TransferDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      customer: {},
      depositorName: "",
      depositorNumber: "",
      amount: "",
      email: "",
      errors: {
        depositorName: "",
        depositorNumber: "",
        amount: "",
        email: "",
      },
      formInvalid: "",
      formSubmited: false,
    };

    this.transferFund = this.transferFund.bind(this);
    //this.notify = this.notify.bind(this)
  }

  componentDidMount() {
    this.getCustomerById();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let err = this.state.errors;

    switch (name) {
      case "depositorName":
        err.depositorName = value.length < 1 ? "Name should not be empty" : "";
        break;

      case "email":
        err.email = validEmailRegex.test(value)
          ? ""
          : "Please enter valid email";
        break;
      case "amount":
        err.amount = value.length < 1 ? "Please enter amount" : "";
        break;
      case "depositorNumber":
        err.depositorNumber =
          value.length < 1 ? "Please Enter Valid Phone Number" : "";
        break;
      default:
        break;
    }

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //Retrieve Customer  with  matching ID
  getCustomerById = async () => {
    let id = this.props.match.params.id;

    await axios.get(URL + "customers").then((res) => {
      this.setState({
        customers: res.data.response,
      });
    });
    const customers = this.state.customers;

    //Filter Customer by Id
    let filterCustomer = customers.filter(function (e) {
      return e.userId === id;
    });

    filterCustomer.forEach((item) => {
      this.setState({
        customer: item,
      });
    });

    return this.state.customer;
  };

  notify = () => toast.success("Successfuly Transferred");

  transferFund = async (e) => {
    e.preventDefault();

    // Check form input field to make sure is not empty
    let err = this.state.errors;

    const data = this.state.customer;
    let balance = Number(data.currentBalance);
    let received = this.state.amount;
    let totalAmount = Number(balance) + Number(received);

    if (this.state.depositorName === "") {
      err.depositorName = "First Name required";
    }

    if (this.state.depositorNumber === "") {
      err.depositorNumber = "Depositor's Name required";
    }

    if (this.state.amount === "") {
      err.amount = "Please Enter Amount";
    }

    if (this.state.email === "") {
      err.email = "Email Address required";
    }

    if (validateForm(this.state.errors)) {
      // create transfer instance
      const fund = {
        transactionId: Math.floor(Math.random() * 100000) + 1,
        customer: {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          gender: data.gender,
          accountNumber: data.accountNumber,
          initialBalance: data.currentBalance,
          amountReceived: received,
          newBalance: totalAmount,
        },
        depositor: {
          name: this.state.depositorName,
          phoneNumber: this.state.depositorNumber,
          email: this.state.email,
        },
        date: new Date(),
      };
      // Send request to server
      await axios.post(URL + "transfer", fund).then((result) => {
        if (result) {
          const update = {
            userId: data.userId,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            gender: data.gender,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            accountNumber: data.accountNumber,
            currentBalance: totalAmount,
          };
          axios.put("/customer-update", update).then((response) => {
            if (response) {
              // Reset state
              this.setState({
                depositorName: "",
                depositorNumber: "",
                amount: "",
                email: "",
                formSubmited: true,
              });
            }
          });
        }
      });
    } else {
      //send validation notification
      this.setState({
        formInvalid: "Please fill correct values in form fields",
      });
    }
  };

  render() {
    const data = this.state.customer;
    const notify = () => toast.success("Successfuly Transferred");
    const { errors } = this.state;

    return (
      <div className="container mt-3">
        <div className="card card-transfer mx-auto">
          <div className="card-body d-flex justify-content-center">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <h5>Account Owner</h5>
              </div>
              <div className="col-md-4">
                <dl>
                  <dt>First Name</dt>
                  <dd>{data.firstName}</dd>
                </dl>
              </div>
              <div className="col-md-4">
                <dl>
                  <dt>Middle Name</dt>
                  <dd>{data.middleName}</dd>
                </dl>
              </div>
              <div className="col-md-4">
                <dl>
                  <dt>last Name</dt>
                  <dd>{data.lastName}</dd>
                </dl>
              </div>
              <div className="col-md-3">
                <dl>
                  <dt>Gender</dt>
                  <dd>{data.gender}</dd>
                </dl>
              </div>
              <div className="col-md-5">
                <dl>
                  <dt>Email</dt>
                  <dd>{data.email}</dd>
                </dl>
              </div>
              <div className="col-md-4">
                <dl>
                  <dt>Account Number</dt>
                  <dd>{data.accountNumber}</dd>
                </dl>
              </div>
              <div className="card-body d-flex justify-content-center">
                <h6>Depositor's Details</h6>
              </div>
              <div>
                <form type="form" className="form" onSubmit={this.transferFund}>
                  <div className="d-flex justify-content-center">
                    <span className="error">{this.state.formInvalid}</span>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mx-auto">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="depositorName"
                          value={this.state.depositorName}
                          onChange={this.handleChange}
                          noValidate
                        />
                        {errors.depositorName.length > 0 && (
                          <span className="error">{errors.depositorName}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mx-auto">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="depositorNumber"
                          value={this.state.depositorNumber}
                          onChange={this.handleChange}
                          noValidate
                        />
                        {errors.depositorNumber.length > 0 && (
                          <span className="error">
                            {errors.depositorNumber}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mx-auto">
                      <div className="form-group">
                        <label>Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          name="amount"
                          value={this.state.amount}
                          onChange={this.handleChange}
                          noValidate
                        />
                        {errors.amount.length > 0 && (
                          <span className="error">{errors.amount}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mx-auto">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          noValidate
                        />
                        {errors.email.length > 0 && (
                          <span className="error">{errors.email}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn-submit"
                      onClick={notify}
                    >
                      Transfer
                    </button>
                  </div>
                </form>
              </div>
              {this.state.formSubmited || this.state.formInvalid ? (
                ""
              ) : (
                <div>
                  <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransferDetails;
