import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const URL = "https://tsfgripbank.herokuapp.com/"

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      customer: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getCustomerDetails();
  }

  //Retrieve Customer  with  matching ID
  getCustomerDetails = async () => {
    let id = this.props.match.params.id;

    await axios.get(URL + "customers").then((res) => {
      this.setState({
        customers: res.data.response,
        isLoading: false,
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

  render() {
    const data = this.state.customer;
    return (
      <div className="container mt-3">
        {this.state.isLoading ? (
          <div className="d-flex justify-content-center">
            <ReactLoading
              type={"spinningBubbles"}
              color={"grey"}
              height={"8%"}
              width={"8%"}
            />
          </div>
        ) : (
          <div className="card card-transfer mx-auto">
            <div className="card-body d-flex justify-content-center">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                  <h5>Customer Details</h5>
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
                <div className="col-md-4">
                  <dl>
                    <dt>Gender</dt>
                    <dd>{data.gender}</dd>
                  </dl>
                </div>
                <div className="col-md-4">
                  <dl>
                    <dt>Phone Number</dt>
                    <dd>{data.phoneNumber}</dd>
                  </dl>
                </div>
                <div className="col-md-4">
                  <dl>
                    <dt>Email</dt>
                    <dd>{data.email}</dd>
                  </dl>
                </div>
                <div className="col-md-12">
                  <dl>
                    <dt>Address</dt>
                    <dd>{data.address}</dd>
                  </dl>
                </div>
                <div className="col-md-6">
                  <dl>
                    <dt>Account Number</dt>
                    <dd>{data.accountNumber}</dd>
                  </dl>
                </div>
                <div className="col-md-6">
                  <dl>
                    <dt>Account Balance</dt>
                    <dd>{data.currentBalance}</dd>
                  </dl>
                </div>
                <div className="col-md-12"></div>
                <Link to="/customers" className="btn-back">
                  Print 
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CustomerDetails;
