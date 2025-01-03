import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { Suspense } from "react";
import SearchResults from "./SearchResults";
import { Cancel } from "@mui/icons-material";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isFocused, setIsFocused] = React.useState(false);
  const deferredSearchQuery = React.useDeferredValue(searchQuery);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!inputRef.current?.contains(event.relatedTarget)) {
        setIsFocused(false); // Hide overlay when focus is lost
      }
    }, 100);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCancel = () => {
    setSearchQuery("");
  };

  return (
    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
      <InputBase ref={inputRef} sx={{ ml: "1rem", flex: 1 }} placeholder="Search Coins" value={searchQuery} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />

      {/* Cancel search btn */}
      {searchQuery && (
        <IconButton onClick={handleCancel} sx={{ height: "inherit", padding: 0 }}>
          <Cancel />
        </IconButton>
      )}

      {/* Search icon */}
      <SearchIcon />

      {/* Search result box */}
      {isFocused && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            maxWidth: "30rem",
            backgroundColor: "white",
            border: "1px solid #ddd",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            zIndex: 1,
            mt: "4px",
            ml: {
              sm: "0rem",
              md: "2rem",
            },
            maxHeight: "20rem",
            overflowY: "auto",
          }}
        >
          <Suspense fallback={<h2>Loading...</h2>}>
            <SearchResults query={deferredSearchQuery} resetQuery={handleCancel} />
          </Suspense>
        </Box>
      )}
    </Paper>
  );
}
