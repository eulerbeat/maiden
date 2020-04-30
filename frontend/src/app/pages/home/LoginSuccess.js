import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Card, CardContent, CardHeader, List, ListItem, ListItemText } from "@material-ui/core";
import PropTypes from 'prop-types';
import './LoginSuccess.css';


function LoginSuccess(props) {
    return (
        <div className="center-div">
            Login Success!
            <Card className="">
                <CardHeader>
                    User Information
                </CardHeader>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText primary={`First Name: ${props.user.first_name}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Last Name: ${props.user.last_name}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Email: ${props.user.email}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Username: ${props.user.username}`} />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </div>
    );
}

export default withRouter(
    connect(
        ({ auth }) => ({ user: auth.user }),
        null
    )(LoginSuccess)
);
