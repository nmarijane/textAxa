import React, {Component} from 'react';
import dateFormat from 'dateformat';
import {API_BASE_URL} from "../../common/constants";
import {toast} from 'react-toastify';
import Chart from "../chart/chart";

/** Represents the modifiable html table component.
 * @class StatsTable
 * @extends Component
 * */
export default class StatsTable extends Component {
    /**
     * Initialize the props items with stocks
     * @constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        };
    }

    /**
     * Enable input and focus into it
     * @function enableInput
     * @param {object} event - representing the input selected
     */
    enableInput(event) {
        event.target.disabled = false;
        event.target.focus();
    }

    /**
     * Update stocks value when you leave the input and disabled all the input (initial state)
     * @function handleMouseLeave
     * @param {object} event - representing the input selected
     * @param {string} index - representing the index of the stock selected
     */
    handleMouseLeave(event, index) {
        this.updateStock(index);
        document.querySelectorAll('.transparentInput').forEach(e => e.disabled = true);
    }

    /**
     * Update the stock value with a put to our node server
     * @function updateStock
     * @param {string} index - representing the index of the stock selected
     */
    updateStock(index) {
        const selectedItem = this.state.items.find(res => res.id === index);
        fetch(API_BASE_URL + "/stocks/" + selectedItem.id,
            {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedItem.id,
                    timestamp: selectedItem.date,
                    stocks: selectedItem.value,
                })
            }).then(res => {
                toast.success('Stock enregistrée avec succès : ', {
                    position: toast.POSITION.TOP_CENTER,
                });
            // if update was successful, leave the input
        }).catch(err => {
            console.log(err);
            toast.error('Error updating stock ! ', {
                position: toast.POSITION.TOP_LEFT
            });
            }
        );
    }

    /**
     * Update the value of the new stock in the local state and emit an event to the parent
     * @function changeItem
     * @param {object} event - representing the input selected
     * @param {string} id - representing the index of the stock selected
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
    }

    /**
     * Build the html table with stock items stored in the local state
     * @function buildHtmlTable
     */
    buildHtmlTable() {
        return this.state.items.map((itm) => {
            const i = itm.id;
            return (
                <tr key={"ln" + i}>
                    <td>{dateFormat(itm.date, "dd/mm/yyyy")}</td>
                    <td onClick={(e) => {this.enableInput(e)}}>
                        <input type="number"
                               key={"i" + i}
                               value={itm.value}
                               className="transparentInput"
                               ref={(key) => this[i] = key}
                               onChange={(e) => {
                                   this.changeItem(e, i)
                               }}
                               onBlur={(e) => {
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
        return <div><Chart items={this.state.items}/>
        <table className="table table-striped table-sm">
            <thead>
            <tr>
                <th key="thDate">Date</th>
                <th key="thStocks">Stocks</th>
            </tr>
            </thead>
            <tbody>
            {this.buildHtmlTable()}
            </tbody>
        </table></div>;
    }

}
