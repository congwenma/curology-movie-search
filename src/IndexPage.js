import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "./Pagination";
import TablePagination from "@material-ui/core/TablePagination";
// import movies from "./moviesMock";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import CircularProgress from "@material-ui/core/CircularProgress";

import { search as movieSearch } from "./services/movie";
import _ from "lodash";

const getImageUrl = poster_path =>
  `https://image.tmdb.org/t/p/w200${poster_path}`;

const updateSearchHistory = ({ query, page }) => {
  const searchUrl = `?query=${query}&page=${page}`;
  window.history.pushState(null, null, searchUrl);
};

export default class IndexPage extends React.Component {
  constructor(props) {
    const {
      location: { search }
    } = props;

    const query = /query=([^&]*)/.exec(props.location.search)[1];
    const page = /page=([^&]*)/.exec(props.location.search)[1];

    super(props);
    this.state = {
      movies: [],
      metadata: {},
      query,
      page,
      isLoading: true
    };

    this.handleSearch(query, page);
  }

  handleUpdateSearch = async event => {
    const {
      target: { value }
    } = event;
    console.log(`searching... ${value}`);
    this.setState(
      {
        query: value
      },
      () => this.debouncedSearch(value)
    );
  };

  handleSearch = async (query, page) => {
    query = query || "a"; // NOTE: can't use a wild card
    page = page || 1;
    console.log("handle search invoked", query, page);

    this.setState({ isLoading: true });
    const resp = await (await movieSearch({ query, page })).json();
    const { results, ...metadata } = resp;
    updateSearchHistory({ query, page });
    this.setState({
      movies: results,
      metadata, // page, total_results, total_pages
      page: page || 1,
      isLoading: false
    });
  };

  debouncedSearch = _.debounce(this.handleSearch, 500);

  // NOTE: mui's page was designed to start from 0, so we need to add one when we want to use it
  handlePageChange = (event, muiPage) => {
    const { query } = this.state;

    this.debouncedSearch(query, muiPage + 1);
  };

  render() {
    const {
      movies,
      isLoading,
      metadata: { page, total_results, total_pages }
    } = this.state;

    const paginationElement = (
      <div className="flex flex-row-reverse">
        <TablePagination
          rowsPerPageOptions={[20]}
          colSpan={3}
          count={total_results}
          page={page - 1}
          rowsPerPage={20}
          SelectProps={{
            native: true
          }}
          onChangePage={this.handlePageChange}
          ActionsComponent={Pagination}
        />
      </div>
    );

    return (
      <div className={"p4"} style={{ width: 1200 }}>
        <h1>Index Page</h1>
        <Paper elevation={1} className="my2 flex">
          <IconButton aria-label="Search">
            <SearchIcon color="primary" />
          </IconButton>
          <InputBase
            placeholder="Search for movies..."
            className="flex-auto"
            onChange={this.handleUpdateSearch}
          />
        </Paper>

        <Paper elevation={1}>
          {isLoading ? (
            <div
              className="flex items-center justify-center"
              style={{ height: 500, width: "100%" }}
            >
              <CircularProgress size={200} />
            </div>
          ) : (
            <>
              {paginationElement}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Poster</TableCell>
                    <TableCell>Popularity</TableCell>
                    <TableCell>Overview</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {movies.map(movie => (
                    <TableRow key={movie.id}>
                      <TableCell component="th" scope="movie">
                        {movie.title}
                      </TableCell>
                      <TableCell>
                        <img src={getImageUrl(movie.poster_path)} />
                      </TableCell>
                      <TableCell>{movie.popularity}</TableCell>
                      <TableCell>{movie.overview}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {paginationElement}
            </>
          )}
        </Paper>
      </div>
    );
  }
}
