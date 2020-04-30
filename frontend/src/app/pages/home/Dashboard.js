import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Card, CardContent, CardHeader, CardActions, Button } from "@material-ui/core";
import PropTypes from 'prop-types';
import './Dashboard.css';
import { getDashboard } from '../../service/home.service';
import * as home from '../../store/ducks/home.duck';
import * as auth from '../../store/ducks/auth.duck';


function Dashboard(props) {
    useEffect(() => {
        getDashboard()
            .then(({ data }) => {
                props.setDashboard(data);
            })
            .catch(err => console.log(err));
    }, []);

    const logout = (evt) => {
        props.logout();
    };

    return (
        <div className="center-div">
            Dashboard
            <Card className="">
                <CardHeader title="Some Information" />
                <CardContent>
                    <pre>{props.data.route}</pre>
                    <pre>{props.data.method}</pre>
                </CardContent>
                <CardActions>
                    <Button onClick={logout}>
                        Logout
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default withRouter(
    connect(
        ({ home }) => ({ data: home.data }),
        {
            ...home.actions,
            ...auth.actions
        }
    )(Dashboard)
);
