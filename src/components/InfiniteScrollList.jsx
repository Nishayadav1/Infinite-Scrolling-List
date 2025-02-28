// src/components/InfiniteScrollList.jsx
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "../styles/InfiniteScroll.css";

const InfiniteScrollList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?results=10&page=${page}`
      );
      const newItems = response.data.results;

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="infinite-scroll-container">
      <h2>Infinite Scrolling List</h2>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchItems}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data to load</p>}
      >
        <ul className="list">
          {items.map((item, index) => (
            <li key={index} className="list-item">
              <img src={item.picture.large} alt={item.name.first} className="avatar" />
              <div className="user-info">
                <h3>
                  {item.name.first} {item.name.last}
                </h3>
                <p>Email: {item.email}</p>
                <p>Gender: {item.gender}</p>
              </div>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollList;