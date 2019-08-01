import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { employeeAction } from "../../actions/EmployeeAction";
import { withRouter } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import * as image from "../../images/camera.png"

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class EmployeeCreate extends Component {
  video = {};
  stream = {};
  snapShot = "";

  canvasStyle = {
    margin: 15,
    cursor: "pointer",
    border: ""
  }
  cameraStyle = {
    margin: 15,
    display: "none"
  }
  checkboxStyle = {
    marginTop: 30
  }
  imgStyle = {
    display: "none"
  }

  handleChange = prop => event => {
    const { dispatch } = this.props;
    dispatch(employeeAction.onChangeProps(prop, event));
  };

  componentWillUnmount() {
    this.stream.getTracks()[0].stop();
  }

  componentDidUpdate() {
    const {
      match: { params }
    } = this.props;
    if (params.id && this.snapShot === '') {
      this.snapShot = this.props.employee.imageData;
      this.loadImage(this.snapShot);
    }
  }

  componentDidMount() {
    const {
      match: { params },
      dispatch
    } = this.props;

    dispatch(employeeAction.getEmptyEmployee());

    this.props.dashboard.handleLoadingOpen();

    if (params.id) {
      dispatch(employeeAction.getEmployeeById(params.id));
    } else {
      dispatch(employeeAction.getEmptyEmployee());
      this.loadImage(image);
    }

    this.video = document.getElementById("video");

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.video.srcObject = stream;
      this.stream = stream;
      this.video.play();
      this.props.dashboard.handleLoadingClose();
    });
  }

  loadImage(image) {
    var ctx = document.querySelector('canvas')
    if (ctx.getContext) {

      ctx = ctx.getContext('2d');
      var img1 = new Image();

      img1.onload = function () {
        ctx.drawImage(img1, 0, 0);
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, 500, 500);
      };

      img1.src = image;
    }
  }

  takeSnapshot() {
    var hidden_canvas = document.querySelector('canvas'),
      video = document.querySelector('video.camera_stream'),
      context = hidden_canvas.getContext('2d');

    context.drawImage(video, 0, 0, 320, 240);

    const imageData = hidden_canvas.toDataURL('image/png');

    this.snapShot = imageData;

    return imageData;
  }

  handleClick(event) {
    event.preventDefault();

    const {
      match: { params }
    } = this.props;
    const { dispatch } = this.props;

    let payload = {
      employeeId: this.props.employee.employeeId,
      firstName: this.props.employee.firstName,
      lastName: this.props.employee.lastName,
      pob: this.props.employee.pob,
      userID: this.props.employee.userID,
      active: this.props.employee.active,
      imageData: this.snapShot
    };

    if (params.id) {
      dispatch(employeeAction.editEmployeeInfo(params.id, payload));
    } else {
      dispatch(employeeAction.createEmployee(payload));
    }
  }

  render() {
    const { classes } = this.props;
    const { employee } = this.props;

    const {
      match: { params }
    } = this.props;

    function InsertText(props) {
      return <h2>{"Add New Employee"}</h2>;
    }

    function EditText(props) {
      return <h2>{"Edit Employee"}</h2>;
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
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div>
              <Paper className={classes.contentRoot} elevation={1}>
                <form
                  className={classes.container}
                  onSubmit={event => this.handleClick(event)}
                >
                  <Grid container spacing={24}>
                    <Grid item xs={3}>
                      <video id="video" width="320" height="240" autoPlay className="camera_stream" style={this.cameraStyle} />
                      <canvas onClick={() => this.takeSnapshot(this)} width="320" height="240" style={this.canvasStyle}></canvas>
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={3}>
                      <TextField
                        required
                        id="firstName"
                        label="First Name"
                        className={classes.textField}
                        value={employee.firstName}
                        onChange={this.handleChange("firstName")}
                        margin="normal"
                        inputProps={{ maxLength: 50 }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        className={classes.textField}
                        value={employee.lastName}
                        onChange={this.handleChange("lastName")}
                        margin="normal"
                        inputProps={{ maxLength: 50 }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        id="POB"
                        label="Place of birthday"
                        className={classes.textField}
                        value={employee.pob}
                        onChange={this.handleChange("pob")}
                        margin="normal"
                        inputProps={{ maxLength: 50 }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <FormControlLabel style={this.checkboxStyle}
                        control={
                          <Checkbox
                            id="active"
                            label="Active"
                            className={classes.Checkbox}
                            checked={employee.active}
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
                          <Link to="/employee">
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

EmployeeCreate.propTypes = {
  employeeId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  pob: PropTypes.number,
  lastChange: PropTypes.number,
  userID: PropTypes.number,
  active: PropTypes.bool,
  imageData: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return state;
};

const connectedEmployeeCreatePage = withRouter(
  connect(
    mapStateToProps,
    null,
    null,
    {
      pure: false
    }
  )(withStyles(styles)(EmployeeCreate))
);

export { connectedEmployeeCreatePage as EmployeeCreate };
