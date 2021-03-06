import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/blog-item";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isloading: true
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.activateInfiniteScroll();
  }

  activateInfiniteScroll() {
    window.onscroll= () => {
      if ( 
        window.innerHeight + document.documentElement.scrollTop === 
        document.documentElement.offsetHeight
      ) {
        this.getBlogItems();
      }
    };
  }   

    getBlogItems() {
      this.setState({
        currentPage: this.state.currentPage + 1
      });

      axios
        .get(`https://emilyb.devcamp.space/portfolio/portfolio_blogs?page=${this.
        state.currentPage}`, 
        {
          withCredentials: true
        }
        )
        .then(response => {
          console.log("getting", response.data);
          this.setState({
            blogItems: response.data.portfolio_blogs,
            totalCount: response.data.meta.total_records,
            isloading: false
          });
        })
        .catch(error => {
          console.log("getBlogItems error", error);
        });
    }

    componentWillMount() {
      this.getBlogItems();
    }

    render() {
      const blogRecords = this.state.blogItems.map(blogItem => {
        return <BlogItem key={blogItem.id} blogItem={blogItem} />;
      });

      return (
        <div className="blog-container">
          <div className="content-container">{blogRecords}</div>

          {this.state.isloading  ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
          ) : null }
        </div>
      );
    }
  }

  export default Blog;