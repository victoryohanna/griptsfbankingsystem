import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";

const URL = "https://tsfgripbank.herokuapp.com/"

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      isLoading: true,
      offset: 0,
      perPage: 5,
      currentPage: 0,
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.getCustomers();
  }
  getCustomers = async () => {
    await axios.get(URL + "customers").then((result) => {
      const data = result.data.response;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        customers: slice,
        isLoading: false,
      });
    });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.getCustomers();
      }
    );
  };

  render() {
    const data = this.state.customers;
    let match = this.props.match;
    return (
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <h3>Fund Transfer</h3>{" "}
            </div>
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
              <div className="table-responsive-sm">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Firt Name</th>
                      <th>Middle Name</th>
                      <th>Last Name</th>
                      <th>Gender</th>
                      <th>Account N0</th>
                      <th>Phone Number</th>
                      <th>Send Money</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-row">{item.firstName}</td>
                          <td className="table-row">{item.middleName}</td>
                          <td className="table-row">{item.lastName}</td>
                          <td className="table-row">{item.gender}</td>
                          <td className="table-row">{item.accountNumber}</td>
                          <td className="table-row">{item.phoneNumber}</td>
                          <td className="table-row">
                            <button className="btn-view">
                              <Link
                                to={`${match.url}/${item.userId}`}
                                className="link"
                              >
                                Select
                              </Link>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

export default Transfer;
