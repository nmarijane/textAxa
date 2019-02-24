import React, {Component} from 'react';
import StatsTable from "./table/table";
import {API_BASE_URL, API_STOCK, MESSAGES} from "./config";
import Chart from "./chart/chart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch(API_BASE_URL + API_STOCK + "?_limit=20")
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            () => {
              this.setState({
                isLoaded: true,
                error: MESSAGES.ERROR
              });
            }
        )
  }

  render() {
    const {error, isLoaded, items} = this.state;
    if (error) {
      return <div className="alert alert-danger error" role="alert">
        {error}
      </div>;
    } else if (!isLoaded) {
      return <div className="loading">{MESSAGES.LOADING}</div> ;
    } else {
      return <div className="py-5 text-center">
        <Chart items={items}/>
        <StatsTable items={items}/>
      </div>;
    }
  }
}
export default App;
