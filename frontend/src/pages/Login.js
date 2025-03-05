import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = { email: "", password: "" };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:5000/api/auth/login", this.state);
    localStorage.setItem("token", data.token);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="email" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
