export const handleSearchType = (e, setSearchType) => {
    const type = e.target.value;
    setSearchType(type);
    // console.log(type);
};

export const handleSearch = (e,setData, newData, setSearchItem) => {
    const searchTerm = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    if (searchTerm === '') {
        setData(newData)
        setSearchItem("")
        // console.log(newData);
    }
    else {
        setSearchItem(searchTerm);
    }
    // console.log(searchItem);
};

export const handleFilterCustomer = (searchType, newData, searchItem, setFilteredData, filteredData) => {
    if (searchType === "Firstname") {
        const filteredItems = newData.filter((item) =>
            item.firstname.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredData(filteredItems);
        // console.log(filteredData);
    } else if (searchType === "Lastname") {
        const filteredItems = newData.filter((item) =>
            item.lastname.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredData(filteredItems);
        // console.log(filteredItems);
    } else if (searchType === "Email") {
        const filteredItems = newData.filter((item) =>
            item.email.toLowerCase().includes(searchItem.toLowerCase())
        );
        // console.log(filteredItems);
        setFilteredData(filteredItems);
    } else if (searchType === "Mobile") {
        const filteredItems = newData.filter((item) =>
            item.mobile.toLowerCase().includes(searchItem.toLowerCase())
        );
        // console.log(filteredItems);
        setFilteredData(filteredItems);
    } else {
        const filteredItems = newData.filter(
            (item) =>
                item.firstname.toLowerCase().includes(searchItem.toLowerCase()) ||
                item.lastname.toLowerCase().includes(searchItem.toLowerCase()) ||
                item.mobile.toLowerCase().includes(searchItem.toLowerCase()) ||
                item.email.toLowerCase().includes(searchItem.toLowerCase())
        );
        // console.log(filteredItems);
        setFilteredData(filteredItems);
    }
};


export  const handleFilterOrder = (searchType, newData, searchItem, setFilteredData, filteredData) => {
    if (searchType === "Productname") {
      const filteredItems = newData.filter((item) =>
        item.productName.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredData(filteredItems);
      // console.log(filteredData);
    } else if (searchType === "Customername") {
      const filteredItems = newData.filter((item) =>
        item.customerName.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredData(filteredItems);
      // console.log(filteredItems);
    } else {
      const filteredItems = newData.filter(
        (item) =>
          item.productName.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.customerName.toLowerCase().includes(searchItem.toLowerCase())
      );
      // console.log(filteredItems);
      setFilteredData(filteredItems);
    }
  };

  export   const handleFilterProduct = (searchType, newData, searchItem, setFilteredData, filteredData) => {
    if (searchType === "Productname") {
      const filteredItems = newData.filter((item) =>
        item.title.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredData(filteredItems);
      // console.log(filteredData);
    } else if (searchType === "Brand") {
      const filteredItems = newData.filter((item) =>
        item.brand.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredData(filteredItems);
      // console.log(filteredItems);
    } else if (searchType === "Category") {
      const filteredItems = newData.filter((item) =>
        item.category.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredData(filteredItems);
      // console.log(filteredItems);
    } else {
      const filteredItems = newData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchItem.toLowerCase())
      );
      // console.log(filteredItems);
      setFilteredData(filteredItems);
    }
  };