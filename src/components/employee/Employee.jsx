import { connect } from "react-redux";
import { employeeAction } from "../../actions/EmployeeAction";
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  card: {
    width: 200,
    margin: 15,
    float: 'left'
  },
  media: {
    paddingTop: "56.25%",
    width: 190,
    height: 190,
    borderRadius: 190 / 2,
    marginLeft: 5,
    marginRight: 5
  },
  actions: {
    display: "flex"
  },
  expand: {
    marginLeft: "auto"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class Employee extends Component {
  constructor(props) {
    const { dispatch } = props;
    dispatch(employeeAction.getEmptyEmployee());
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(employeeAction.getEmployee());
  }

  handleClick = (event, id) => {
    const { dispatch } = this.props;
    dispatch(employeeAction.deleteEmployeeById(id));
  };

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  render() {
    const { classes } = this.props;
    const { employee } = this.props.employee;

    return (
      <div>
        <h2>Employee</h2>
        <Grid container spacing={24}>
          <Grid item xs={3} />
          <Grid item xs={6} />
          <Grid item xs={3} container justify="flex-end">
            <Link to="/add-employee">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add Employee
              </Button>
            </Link>
          </Grid>
        </Grid>
        {employee.map(n => {
          return (
            <Card className={classes.card} key={n.employeeId}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {n.firstName[0] + n.lastName[0]}
                  </Avatar>
                }
                title={n.firstName + ' ' + n.lastName}
                subheader={this.formatDate(new Date(n.lastChange))}
              />
              <CardMedia
                className={classes.media}
                image={n.imageData}
              />
              <CardActions className={classes.actions} disableActionSpacing>
                <Link to={`/edit-employee/${n.employeeId}`}>
                  <IconButton
                    className={classes.button}
                    aria-label="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  className={classes.expand}
                  aria-label="Delete"
                  onClick={event =>
                    this.handleClick(event, n.employeeId)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>)
        })}
      </div>
    );
  }
}

Employee.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    employee: state.employee
  };
};

const connectedEmployeePage = withRouter(
  connect(
    mapStateToProps,
    null,
    null,
    {
      pure: false
    }
  )(withStyles(styles)(Employee))
);

export { connectedEmployeePage as Employee };
