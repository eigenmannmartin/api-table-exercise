import React from 'react';
import { connect } from 'react-redux';

function App() {
  return (
    <div className="app">
      Render posts as a table here
    </div>
  );
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
