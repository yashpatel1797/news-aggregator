import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout/Layout';
import ArticleList from './components/Articles/ArticleList';

function App() {

  return (
    <Provider store={store}>
    <Layout>
      <ArticleList />
    </Layout>
  </Provider>
  );
}

export default App
