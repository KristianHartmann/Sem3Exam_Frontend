import React, { useRef } from "react";

const Search = (props) => {
  const inputRef = useRef();
  console.log(inputRef);
  return (
    <div>
      <h3> Search</h3>
      <form>
        <input
          type="search"
          ref={inputRef}
          required
          placeholder="Search....  "
        />
        <button
          type="submit"
          onClick={() => {
            inputRef.current.focus();
          }}>
          {" "}
          Search
        </button>
      </form>
    </div>
  );
};
export default Search;
