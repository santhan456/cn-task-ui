import Card from 'antd/lib/card';
import Meta from 'antd/lib/card/Meta';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import { fetchNews } from './store/api';
import { State } from './store/reducer';
import { getNewsList, getNewsLoadingState, getPageNumber } from './store/selectors';

function AppImpl(props:any) {
  const {getNews, news} = props;
  
  console.log(news);

  React.useEffect(() => {
    if(news?.length === 0){
      getNews();
    }
  }, [news]);

  const articles = news.map((newsItem:any, index: number) => {
    const {urlToImage, title, description} = newsItem;
    return (
      <Col  span={7}  key={index}>
        <Card
        hoverable={true}
        cover={urlToImage && <img alt="example" src={urlToImage} />}
      >
          <Meta title={title} description={description} />
        </Card>
      </Col>
    )
  });

  return (
    <div className="App" style={{alignContent: "flex-start"}}>
      <Row gutter={[16, 16]} justify="center" wrap={true}  align="stretch" >
      {articles}
      </Row>
    </div>
  );
}

function mapStateToProps(state: State): any {
  return {
    isLoading: getNewsLoadingState(state),
    pageNumber: getPageNumber(state),
    news: getNewsList(state)
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    ...bindActionCreators(
      {
        getNews: fetchNews,
      },dispatch),
  }
}

const App = (connect(mapStateToProps, mapDispatchToProps)(AppImpl));

export default App;