import { Container } from '@/components';
import Loading from '@/components/Loading/Loading';
import Tweet from '@/components/Tweet/Tweet';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const H1 = styled.div`
  font-weight: 600;
  font-size: 20px;
  span {
    color: red;
  }
`;

const StyledPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  margin: 50px 16px;
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }

  li.active a {
    color: red;
    font-weight: 700;
    min-width: 32px;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export default function Posts() {
  const location = useLocation();

  const word = location.state.keyword;

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    const criminalId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('accessToken');
    axios
      .post(
        `/api/tweet/list/${criminalId}`,
        {
          keyword: word,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setData(res.data);
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = data.slice(startIndex, endIndex);

  const onPageChange = (e) => {
    setCurrentPage(e.selected);
  };
  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : totalPages !== 0 ? (
        <div>
          <H1>
            <span>{word}</span>의 검색 결과입니다.
          </H1>
          {subset.map((item, idx) => {
            return (
              <Tweet
                userName={item.username}
                userId={item.user}
                tweet={item.tweet}
                url={item.url}
              />
            );
          })}
          <StyledPaginate
            pageCount={totalPages}
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            onPageChange={onPageChange}
            forcePage={currentPage}
            pageRangeDisplayed={10}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      ) : (
        <H1>
          <span>{word}</span> 검색 결과가 없습니다.
        </H1>
      )}
    </Container>
  );
}
