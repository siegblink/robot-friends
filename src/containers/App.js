import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import Header from '../components/Header';
import Footer from '../components/Footer';

import './App.css';

let prevScrollpos = window.pageYOffset;

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  };
};

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillMount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
      document.getElementById('navbar').style.top = '0';
    } else {
      document.getElementById('navbar').style.top = '-80px';
    }
    prevScrollpos = currentScrollPos;
  };

  render() {
    const { robots, searchField, onSearchChange, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return (
      <Fragment>
        <div className="wrapper">
          <Header>
            <SearchBox searchChange={onSearchChange} />
          </Header>
          <Scroll>
            {isPending ? (
              <h1>Loading</h1>
            ) : (
              <ErrorBoundry>
                <CardList robots={filteredRobots} />
              </ErrorBoundry>
            )}
          </Scroll>
          <div className="push" />
        </div>
        <Footer />
      </Fragment>
    );
  }
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
