import React, { Component } from "react";
import "./Form.css";

import {
  CountryDropdown,
  RegionDropdown
} from "react-country-region-selector";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: "",
      region: "",
      name: null,
      email: null,
      password: null,
      formErrors: {
        name: "",
        email: "",
        password: "",
      },
    };
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      country: "",
      region: "",
      name: "",
      email: "",
      password: "",
      formErrors: {
        name: "",
        email: "",
        password: "",
      },
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  render() {
    const { formErrors } = this.state;
    const { country, region } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="name">Name</label>
              <input
                value={this.state.name}
                className={formErrors.name.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                value={this.state.email}
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                value={this.state.password}
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="country">
              <label htmlFor="country">Country</label>
              <CountryDropdown
                classes="what"
                value={country}
                onChange={(val) => this.selectCountry(val)}
              />
            </div>
            {country ? (
              <div className="state">
                <label htmlFor="state">State</label>
                <RegionDropdown
                  classes="what"
                  country={country}
                  value={region}
                  onChange={(val) => this.selectRegion(val)}
                />
              </div>
            ) : (
              ""
            )}
            <div className="createAccount">
              <button
                onClick={() => this.handleSubmit}
                type="submit"
                disabled={!this.state.region}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
