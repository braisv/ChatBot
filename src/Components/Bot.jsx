import React, { Component } from "react";
import axios from "axios";
import "./Bot.css";

let clientName;
let num = 0;

export default class Bot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      special: "",
      question: "¿Cómo te llamas?",
      input: ""
    };
  }

  showResponse(e) {
    e.preventDefault();
    num++;
    if (num === 1) {
      clientName = this.state.input;
      this.updateOutput(
        `Hola ${clientName}, encantados de hablar contigo. ¿Dónde vives?`
      );
    } else if (num === 2) {
      this.updateOutput(
        `Nos encanta ${this.state.input}, ${
          this.state.input.toLowerCase() === "madrid" ||
          this.state.input.toLowerCase === "barcelona"
            ? "tenemos una tienda ahí."
            : "pronto abriremos tienda ahí. De momento podrás disfrutar de nuestros servicios online."
        } ¿Quieres saber el especial del día?`
      );
    } else if (num === 3) {
      this.updateOutput(
        `${
          this.state.input.toLowerCase() === "si"
            ? `El especial del día es ${this.state.special}`
            : `Buenos, te lo vamos a decir de todas formas... El especial del día es ${this.state.special}`
        }. Esperamos que lo disfrutes, ${clientName}.`
      );
    }
  }

  updateOutput(next) {
    this.setState({
      ...this.state,
      question: next,
      input: ""
    });
  }

  handleInput(e) {
    this.setState({
      ...this.state,
      input: e.target.value
    });
  }

  componentDidMount() {
    //   $(document).on("keypress", function(e) {
    //     if (e.which === 13) {
    //       this.showResponse();
    //     }
    //   });

    //   $("#ans").focus();

    //METHOD 1 ===== FETCH + HEADERS

    // let myHeaders = {
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': '*',
    //   'Access-Control-Allow-Methods': '*',
    //   'Access-Control-Allow-Origin': '*',
    //   'Authorization': 'allow'
    // }

    // let options = {
    //   method: "GET",
    //   headers: myHeaders,
    //   mode: "cors",
    //   withCredentials: false,
    //   cache: "default"
    // };

    // fetch("https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery", options)
    // .then(res => {
    //     const food = res.data;
    //     this.setState({ special: food });
    // })
    //.catch(err => console.log('METHOD 1 failed, ', err));

    //METHOD 2 ===== AXIOS + HEADERS

    // axios({
    //     url: "https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery",
    //     method: 'GET',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Access-Control-Allow-Headers': '*',
    //       'Access-Control-Allow-Methods': '*',
    //       'Access-Control-Allow-Origin': '*',
    //     },
    //     data: '*'
    //   })
    //   .then(res => {
    //     console.log('RES, ', res)
    //     const food = res.data;
    //     this.setState({ special: food });
    //   })
    //.catch(err => console.log('METHOD 2 failed, ', err));

    //METHOD 3 ===== AXIOS + API-CORS

    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery"
      )
      .then(res => {
        console.log(res.data);
        const food = res.data;
        this.setState({ special: food });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.food);

    return (
      <div>
        <div class="area">
          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="context">
          <h1>Panadería Pantástica</h1>
        </div>
        <div className="question">{this.state.question}</div>
        <form onSubmit={e => this.showResponse(e)}>
          <input
            className="answer"
            type="text"
            placeholder="Enter your response"
            required
            value={this.state.input}
            onChange={e => this.handleInput(e)}
          />
        </form>
        <div className="line"></div>
      </div>
    );
  }
}
