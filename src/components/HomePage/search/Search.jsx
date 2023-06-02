import styles from "./search.module.css";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import useFetch from "../../../custom hooks/useFetch";

import SearchResults from "./SearchResults";

import { MyContext } from "../../../context/authCTX";
import { useContext } from "react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Loader from "../../UI/Loader";

import { useSearchParams } from "react-router-dom";

const Search = (props) => {
  const [searchBy, setSearchBy] = React.useState("Title");
  const [searchInput, setSearchInput] = React.useState("");

  const [searchParams] = useSearchParams();

  const ctx = useContext(MyContext);
  const navigate = useNavigate();

  const handleTypeChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const [
    responseData,
    isLoading,
    getBooksByTitle,
    getBooksByAuthor,
    getBooksByCategory,
  ] = useFetch();

  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    startIndex: 0,
  });

  const onPageChangeHandler = (e, page) => {
    setPaginationState({
      page: page,
      startIndex: page * 16 - 16,
    });
  };

  useEffect(() => {
    if (responseData) {
      navigate(
        `/hp/${ctx.user.firstName}${ctx.user.lastName}/search?searchBy=${searchBy}&query=${searchInput}&p=${paginationState.page}`
      );
    }
  }, [responseData, paginationState.page]);

  const pageCount = responseData && Math.floor(responseData.itemCount / 16 + 1);

  React.useEffect(() => {
    if (searchInput.length > 0) {
      const timoute = setTimeout(() => {
        if (searchBy === "Title") {
          getBooksByTitle(searchInput, paginationState.startIndex);
        } else if (searchBy === "Author") {
          getBooksByAuthor(searchInput, paginationState.startIndex);
        } else if (searchBy === "Category") {
          getBooksByCategory(searchInput, paginationState.startIndex);
        }
      }, 1000);
      return () => {
        clearTimeout(timoute);
      };
    }
  }, [searchInput, paginationState.page]);

  useEffect(() => {
    if (
      searchParams.get("searchBy") &&
      searchParams.get("query") &&
      searchParams.get("p")
    ) {
      setSearchBy(searchParams.get("searchBy"));
      setPaginationState({
        page: searchParams.get("p"),
        startIndex: searchParams.get("p") * 16 - 16,
      });
      setSearchInput(searchParams.get("query"));
    }
  }, []);

  return (
    <div className={styles.searchBar}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          textAlign: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            width: "40vw !important",
          }}
          id="standard-basic"
          label="Find new books"
          variant="standard"
          onChange={handleSearchChange}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Search by:
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={searchBy}
            onChange={handleTypeChange}
            label="Search by"
          >
            <MenuItem value={"Title"}>Title</MenuItem>
            <MenuItem value={"Author"}>Author</MenuItem>
            <MenuItem value={"Category"}>Category</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        responseData && (
          <div>
            <SearchResults responseData={responseData} />
            <Stack spacing={4}>
              <Pagination
                count={pageCount}
                color="primary"
                variant="outlined"
                size="large"
                onChange={onPageChangeHandler}
                page={paginationState.page}
              />
            </Stack>
          </div>
        )
      )}
    </div>
  );
};

export default Search;
