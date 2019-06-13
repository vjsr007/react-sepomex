import { connect } from "react-redux";
import { countryAction } from "../../actions/CountryAction";
import { paginationAction } from "../../actions/PaginationAction";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { withRouter, Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import TablePaginationActions from "../shared/TablePaginationActions";
import {EnhancedTableToolbar, EnhancedTableHead} from "../shared/TableOrderTools"

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Country extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(countryAction.getCountry());
  }

  handleDelete = (event) => {
    const { dispatch } = this.props;
    const { selected } = this.props.pagination;
    dispatch(countryAction.deleteCountries(selected));
    dispatch(paginationAction.changeSelected({ selected: [] }));
  };

  handleChangePage = (event, page) => {
    const { dispatch } = this.props;
    dispatch(paginationAction.changePage(page));
  };

  handleChangeRowsPerPage = event => {
    const { dispatch } = this.props;
    dispatch(paginationAction.changeRowsPerPage(event.target.value));
  };

  handleRequestSort = (event, property) => {
    const { dispatch } = this.props;
    const { order, orderBy } = this.props.pagination;
    const orderByChange = property;
    let orderChange = "desc";

    if (orderBy === property && order === "desc") {
      orderChange = "asc";
    }

    dispatch(paginationAction.changeOrder(orderChange, orderByChange));
  };

  handleSelectAllClick = event => {
    const { dispatch } = this.props;
    const { country } = this.props.country;
    if (event.target.checked) {
      dispatch(
        paginationAction.changeSelected({
          selected: country.map(n => n.countryID)
        })
      );
      return;
    }
    dispatch(paginationAction.changeSelected({ selected: [] }));
  };

  isSelected = id => {
    return this.props.pagination.selected.indexOf(id) !== -1;
  };

  handleClickSelect = (event, id) => {
    const { dispatch } = this.props;
    const { selected } = this.props.pagination;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    dispatch(paginationAction.changeSelected({ selected: newSelected }));
  };

  render() {
    const { classes } = this.props;
    const { country } = this.props.country;
    const {
      rowsPerPage,
      page,
      order,
      orderBy,
      selected
    } = this.props.pagination;
    const rows = country;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div>
        <h2>Country</h2>
        <Grid container spacing={24}>
          <Grid item xs={3} />
          <Grid item xs={6} />
          <Grid item xs={3} container justify="flex-end">
            <Link to="/add-country">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add Country
              </Button>
            </Link>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container spacing={24}>
          <Paper className={classes.root}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              title="Countries"
              onClickDelete = {event =>
                this.handleDelete(event)
              }
            />
            <Table className={classes.table}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={rows.length}
                rows={[
                  {
                    id: "countryID",
                    numeric: true,
                    disablePadding: false,
                    label: "ID"
                  },
                  {
                    id: "name",
                    numeric: false,
                    disablePadding: false,
                    label: "Name"
                  },
                  {
                    id: "code",
                    numeric: false,
                    disablePadding: false,
                    label: "Code"
                  },
                  {
                    id: "currency",
                    numeric: false,
                    disablePadding: false,
                    label: "Currency"
                  },
                  {
                    id: "currencyCode",
                    numeric: false,
                    disablePadding: false,
                    label: "Currency Code"
                  },
                  {
                    id: "active",
                    numeric: false,
                    disablePadding: false,
                    label: "Active"
                  },
                  {
                    id: "edit",
                    numeric: false,
                    disablePadding: false,
                    label: "Edit"
                  }
                ]}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.countryID);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.countryID}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onClick={event =>
                              this.handleClickSelect(event, n.countryID)
                            }
                          />
                        </TableCell>
                        <TableCell>{n.countryID}</TableCell>
                        <TableCell>{n.name}</TableCell>
                        <TableCell>{n.code}</TableCell>
                        <TableCell>{n.currency}</TableCell>
                        <TableCell>{n.currencyCode}</TableCell>
                        <TableCell>
                          <Checkbox disabled checked={n.active} />
                        </TableCell>
                        <TableCell>
                          <Link to={`/edit-country/${n.countryID}`}>
                            <IconButton
                              className={classes.button}
                              aria-label="Edit"
                            >
                              <EditIcon />
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
      </div>
    );
  }
}

Country.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    country: state.country,
    pagination: state.pagination
  };
};

const connectedCountryPage = withRouter(
  connect(
    mapStateToProps,
    null,
    null,
    {
      pure: false
    }
  )(withStyles(styles)(Country))
);

export { connectedCountryPage as Country };
