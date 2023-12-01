import React from "react";

function SearchBox({
  handleSearch,
  searchItem,
  handleSearchType,
  select,
  setSearchType,
  setData,
  newData,
  setSearchItem,
}) {
  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Type to Search..."
          onInput={(e) => handleSearch(e, setData, newData, setSearchItem)}
          value={searchItem}
        />
        <select
          name=""
          id=""
          onChange={(e) => handleSearchType(e, setSearchType)}
        >
          {select.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SearchBox;
