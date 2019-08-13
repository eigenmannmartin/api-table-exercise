import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Segment, Container, Header } from 'semantic-ui-react'
import * as actions from './actions' // contained in actions -> prevents unintended access
import * as selectors from './selectors'
import PostsTable from './components/PostsTable'

function App({ loadData, posts, setPageIndex, setPageSize }) {
  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Container>
      <Segment>
        <Header textAlign='center'>Posts</Header>
      </Segment>
      <Segment>
        <Dimmer active={posts.loading} inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
        <PostsTable rows={posts.data} pagination={{ setPageIndex, setPageSize, pageCount: posts.pageCount, pageSize: posts.pageSize, pageIndex: posts.pageIndex }} />
      </Segment>
    </Container>
  );
}

const mapStateToProps = state => ({
  posts: selectors.postsSelector(state) // will give you { data, loading }
})

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(actions.loadData()), // depending on the usecase we could dispatch this higher up the tree (right after @@INIT is fired)
  setPageIndex: (page) => dispatch(actions.setPageIndex(page)),
  setPageSize: (page) => dispatch(actions.setPageSize(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
