import React, {Component} from 'react';
import dateFormat from 'dateformat';

class StatsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }

    onChange(event, index) {
        const newItems = this.state.items.map(item => {
            return item.index !== index ? item :
                {
                    date: item.date,
                    index: item.index,
                    value: event.target.value
                }
        });
        this.setState({items: newItems});
        this.props.onTableStocksChange(newItems);
    }

    dateTableMapper() {
        return this.state.items.map((itm) => {
            const i = itm.index;
            return (
                <tr key={"ln" + i}>
                    <td key={"dt" + i}>{dateFormat(itm.date, "dd/mm/yyyy")}</td>
                    <td key={"sk" + i}>
                        <input type="text"
                               key={"i" + i}
                               value={itm.value}
                               className="transparentInput"
                               ref={(key) => this[i] = key}
                               onChange={(e) => {
                                   this.onChange(e, i)
                               }}/>
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
