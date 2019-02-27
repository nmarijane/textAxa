import React, {Component} from 'react';
import StatsTable from "./table/table";
import Chart from "./chart/chart";
import {API_BASE_URL, MESSAGES} from "../common/constants";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.handleTableStocksChange = this.handleTableStocksChange.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    handleTableStocksChange(items) {
        this.setState({items: items});
    }

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
                (err) => {
                    this.setState({
                        isLoaded: true,
                        error: err
                    });
                }
            ).catch(
            (err) => {
                this.setState({
                    isLoaded: true,
                    error: MESSAGES.ERROR
                });
            }
            );
    }

    componentDidMount() {
        this.getStock();
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div className="alert alert-danger error" role="alert">
                {error}
            </div>;
        } else if (!isLoaded) {
            return <div className="loading">{MESSAGES.LOADING}</div>;
        } else {
            return <div className="text-center">
                <Chart items={items}/>
                <StatsTable items={items} onTableStocksChange={this.handleTableStocksChange}/>
            </div>;
        }
    }
}
