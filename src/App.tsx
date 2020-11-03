import Card from 'antd/lib/card';
import Meta from 'antd/lib/card/Meta';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import { fetchNews } from './store/api';
import { State } from './store/reducer';
import { getNewsList, getNewsLoadingState, getPageNumber } from './store/selectors';
import {debounce} from "lodash-es";
import Spin from 'antd/lib/spin';

function AppImpl(props:any) {
  const {getNews, news, pageNumber, isLoading} = props;
  
  const [searchInput, changeSearchInput] = React.useState<string>("");

  // React.useEffect(() => {
  //   if(news?.length === 0 && isLoading){
  //     getNews(undefined, pageNumber);
  //   }
  // }, [news, isLoading]);

  React.useEffect(() => {
      !isLoading && getNews(searchInput, pageNumber);
  }, [searchInput]);

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

  const onChange = debounce((e:any) => {
      e?.target?.value && changeSearchInput(e.target.value);
  }, 300);

  const onSearch = (input:string) => {
    input && changeSearchInput(input);
  };

  return (
    <div className="App" style={{alignContent: "flex-start"}}>
      {isLoading && <div id="overlay">
        <Spin size="large" />
      </div>}
       <Search
        onChange={onChange}
        placeholder="input search text"
        allowClear={true}
        onSearch={onSearch}
        size="large"
        style={{ width: 600, margin: '30px auto' }}
      />
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