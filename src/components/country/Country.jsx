import { connect } from "react-redux";
import { countryAction } from "../../actions/CountryAction";
import { paginationAction } from "../../actions/PaginationAction";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { withRouter, Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import TablePaginationActions from "../shared/TablePaginationActions";

import TableSortLabel from "@material-ui/core/TableSortLabel";
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

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

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      rows
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, title, onClickDelete } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={onClickDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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
