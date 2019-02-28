import React, {Component} from 'react';
import StatsTable from "./table/table";
import Chart from "./chart/chart";
import {API_BASE_URL, MESSAGES} from "../common/constants";
import {toast, ToastContainer} from 'react-toastify';

/** Represents the root component displayed in index.html.
 * @class App
 * @extends Component
 * */
export default class App extends Component {
    /**
     * Initialization
     * @constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.handleTableStocksChange = this.handleTableStocksChange.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    /**
     * Enable input and focus into it
     * @function handleTableStocksChange
     * @param {object[]} items - array of stocks
     */
    handleTableStocksChange(items) {
        this.setState({items: items});
    }

    /**
     * Get stocks from our server and handle errors
     * @function getStock
     */
    getStock() {
        fetch(API_BASE_URL + "/stocks?limit=20", {mode: 'cors', method: 'GET'})
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
            ).catch(
            () => {
                this.setState({
                    isLoaded: true,
                    error: MESSAGES.ERROR
                });
            }
        );
    }

    /** Get stocks when component is fully mounted
     * @function componentDidMount
     */
    componentDidMount() {
        this.getStock();
    }

    render() {
        const {error, isLoaded, items} = this.state;
        let content = '';
        if (error) {
            toast.error('Une erreur est survenue : ' + error, {
                position: toast.POSITION.TOP_CENTER
            });
        } else if (!isLoaded) {
            content = <div className="loading">{MESSAGES.LOADING}</div>;
        } else {
            content = <div className="text-center">
                <Chart items={items}/>
                <StatsTable items={items} onTableStocksChange={this.handleTableStocksChange}/>
            </div>;
        }
        return <div>
            <ToastContainer autoClose={20000}/>
            {content}
        </div>
    }
}
