import React, {Component} from 'react';
import dateFormat from 'dateformat';
import {API_BASE_URL} from "../../common/constants";
import { ToastContainer, toast } from 'react-toastify';

/**
 * @class StatsTable
 * @description Represents the modifiable table component.
 * @requires Requires stock items in the props to work properly
 * */
export default class StatsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        };
    }

    turnIntoInput(event) {
        event.target.disabled = false;
        event.target.focus();
    }

    handleKeyPress(event, index) {
        if (event.key === 'Enter') {
            this.updateStock(index, event.target);
        }

    }
    handleMouseLeave(event, index) {
        console.log(index);
            this.updateStock(index, event.target);
    }


    updateStock(index, input) {
        const item = this.state.items.find(res => res.id === index);
        fetch(API_BASE_URL + "/stocks/" + item.id,
            {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: item.id,
                    timestamp: item.date,
                    stocks: item.value,
                })
            }).then(res => {
            // if update was successful, leave the input
        }).catch(err => {
            console.log(err);
            toast.error('Error updating stock ! ' + <br/>, {
                position: toast.POSITION.TOP_LEFT
            });
            }
        );
    }

    /**
     * @function change the value of the selected item and store it into the local state
     * @returns void
     */
    changeItem(event, id) {
        // we get the state items and modify the item
        const newItems = this.state.items.map(item => {
            if (item.id === id) {
                return {
                    date: item.date,
                    id: item.id,
                    value: event.target.value
                };
            } else {
                return item;
            }
        });
        this.setState({items: newItems});

        //this instruction will emit event to the parent and pass the new array of stocks
        this.props.onTableStocksChange(newItems);
    }

    /**
     * @function Build the html table with stocks stored in the local state
     * @returns {string}
     */
    buildHtmlTable() {
        return this.state.items.map((itm) => {
            const i = itm.id;
            return (
                <tr key={"ln" + i} onClick={(e) => {this.turnIntoInput(e, i)}}>
                    <td>{dateFormat(itm.date, "dd/mm/yyyy")}</td>
                    <td>
                        <input type="text"
                               key={"i" + i}
                               value={itm.value}
                               className="transparentInput"
                               ref={(key) => this[i] = key}
                               onChange={(e) => {
                                   this.changeItem(e, i)
                               }}
                               onKeyPress={(e, key) => {
                                   this.handleKeyPress(e, i)
                               }}
                               onBlur={(e, key) => {
                                   this.handleMouseLeave(e, i);
                               }}
                               disabled
                        />
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
            {this.buildHtmlTable()}
            </tbody>
        </table>;
    }

}
