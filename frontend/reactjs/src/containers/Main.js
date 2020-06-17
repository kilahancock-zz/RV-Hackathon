



class Main extends Component {
    state = {
      button_clicked: "stretch"
    };
}


button_clicked_handler = (event) => {
  
  let break_category = event.currentTarget.getAttribute('category');

  this.setState({
    button_clicked : break_category
  },
  this.sendPostState(parsedState));
}
