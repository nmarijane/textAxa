import React, {Component} from 'react';
import dateFormat from 'dateformat';
import update from 'react-addons-update';

class StatsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    }
  }

  static turnIntoInput(event) {
    event.target.disabled = false;
    event.target.focus();
  }

  onChange(event, index) {
    const newItems = this.state.items.map(item => {
      return item.index !== index ? item :
          {
            timestamp: item.timestamp,
            index: item.index,
            stocks: event.target.value
          }
    });
    console.log(newItems);
    this.setState({items : newItems});
  }

  dateTableMapper() {
    return this.state.items.map((itm) => {
      const i = itm.index;
      return (
          <tr key={"ln"+i}>
            <td key={"dt"+i}>{dateFormat(itm.timestamp, "dd/mm/yyyy")}</td>
            <td key={"sk"+i} onClick={StatsTable.turnIntoInput.bind(this)}>
              <input type="text"
                     key={"i"+i}
                     value={itm.stocks}
                     className="transparentInput"
                     ref={(key)=>this[i]=key}
                     onChange={(e) => {this.onChange(e, i)}}
                     disabled/>
            </td>
          </tr>
      )
    });
  }

  render() {
    return <table className="table table-striped table-sm">
      <thead>
      <tr>
        <th key="thDate">Date</th>
        <th key="thStocks">Stocks</th>
      </tr>
      </thead>
        <tbody>
        {this.dateTableMapper()}
        </tbody>
      </table>;
  }

}
export default StatsTable;
