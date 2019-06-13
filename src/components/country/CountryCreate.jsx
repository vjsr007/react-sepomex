import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { countryAction } from "../../actions/CountryAction";
import { withRouter } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import customPropTypes from "../../helpers/CustomPropTypes";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class CountryCreate extends Component {
  constructor(props){
    const { dispatch } = props;
    dispatch(countryAction.getEmptyCountry());
    super(props);
  }

  handleChange = prop => event => {
    const { dispatch } = this.props;
    dispatch(countryAction.onChangeProps(prop, event));
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    const { dispatch } = this.props;

    if (params.id) {
      dispatch(countryAction.getCountryById(params.id));
    } else {
      dispatch(countryAction.getEmptyCountry());
    }
  }

  handleClick(event) {
    event.preventDefault();

    const {
      match: { params }
    } = this.props;
    const { dispatch } = this.props;

    let payload = {
      countryID: this.props.country.countryID,
      name: this.props.country.name,
      code: this.props.country.code,
      currency: this.props.country.currency,
      currencyCode: this.props.country.currencyCode,
      lastChange: this.props.country.lastChange,
      userID: this.props.country.userID,
      active: this.props.country.active
    };

    if (params.id) {
      dispatch(countryAction.editCountryInfo(params.id, payload));
    } else {
      dispatch(countryAction.createCountry(payload));
    }
  }

  render() {
    const { classes } = this.props;
    const { country } = this.props;
    const {
      match: { params }
    } = this.props;

    function InsertText(props) {
      return <h2>{"Add New Country"}</h2>;
    }

    function EditText(props) {
      return <h2>{"Edit Country"}</h2>;
    }

    function SegHeader() {
      if (params.id) {
        return <EditText />;
      } else {
        return <InsertText />;
      }
    }

    return (
      <div>
        <SegHeader />
        <br />
        <br />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div>
              <Paper className={classes.contentRoot} elevation={1}>
                <form className={classes.container} onSubmit={event => this.handleClick(event)} >
                  <Grid container spacing={24}>
                    <Grid item xs={3}>
                      <TextField
                        required
                        id="name"
                        label="Name"
                        className={classes.textField}
                        value={country.name}
                        onChange={this.handleChange("name")}
                        margin="normal"
                        inputProps={{maxLength: 20}}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="code"
                        label="Code"
                        className={classes.textField}
                        value={country.code}
                        onChange={this.handleChange("code")}
                        margin="normal"
                        inputProps={{maxLength: 2}}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="currency"
                        label="Currency"
                        className={classes.textField}
                        value={country.currency}
                        onChange={this.handleChange("currency")}
                        margin="normal"
                        inputProps={{maxLength: 5}}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="currencyCode"
                        label="Currency Code"
                        className={classes.textField}
                        value={country.currencyCode}
                        onChange={this.handleChange("currencyCode")}
                        margin="normal"
                        inputProps={{maxLength: 3}}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id="active"
                            label="Active"
                            className={classes.Checkbox}
                            checked={country.active}
                            onChange={this.handleChange("active")}
                            margin="normal"
                          />
                        }
                        label="Active"
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={24}>
                    <Grid item xs={3} />
                    <Grid item xs={6} />
                    <Grid item xs={3} container justify="center">
                      <Grid container spacing={24}>
                        <Grid item xs={6} container justify="center">
                          <Link to="/country">
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                            >
                              Cancel
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item xs={6} container justify="flex-start">
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            type="submit"
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CountryCreate.propTypes = {
  countryID: PropTypes.number,
  name: PropTypes.string,
  code: PropTypes.string,
  currency: PropTypes.string,
  currencyCode: customPropTypes.MaxLength("country", 3),
  lastChange: PropTypes.number,
  userID: PropTypes.number,
  active: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return state;
};

const connectedCountryCreatePage = withRouter(
  connect(
    mapStateToProps,
    null,
    null,
    {
      pure: false
    }
  )(withStyles(styles)(CountryCreate))
);

export { connectedCountryCreatePage as CountryCreate };
