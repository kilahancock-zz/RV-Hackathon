import React, { Component } from 'react'
import CanvasDraw from "react-canvas-draw";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Create.css'

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button_clicked: "stretch",
      color: "#000000"
    };
  }

  handleClick(newColor) {
    console.log("in click")
    this.setState({color: newColor})
  }

  render() {
          return(
            <div>
              <h1 className="drawHead">
                Draw Something!
              </h1>
              <CanvasDraw className="draw" brushColor={this.state.color}/>
              <div className="red" onClick={() => this.handleClick("#ff0000")}>RED</div>
              <div className="blue" onClick={() => this.handleClick("#0000ff")}>BLUE</div>
              <div className="green" onClick={() => this.handleClick("#008000")}>GREEN</div>
              <div className="pink" onClick={() => this.handleClick("#ff69b4")}>PINK</div>
              <div className="purple" onClick={() => this.handleClick("#800080")}>PURPLE</div>
              <div className="orange" onClick={() => this.handleClick("#ffa500")}>ORANGE</div>
            </div>
          );
  }

}


export default Create;
