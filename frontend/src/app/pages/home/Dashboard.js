import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Card, CardContent, CardHeader, CardActions } from "@material-ui/core";
import PropTypes from 'prop-types';
import './Dashboard.css';


function Dashboard(props) {
    return (
        <div className="center-div">
            Dashboard
            <Card className="">
                <CardHeader>
                    Some Information
                </CardHeader>
                <CardContent>

                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </div>
    );
}

export default withRouter(
    connect(
        ({ auth }) => ({ user: auth.user }),
        null
    )(Dashboard)
);
