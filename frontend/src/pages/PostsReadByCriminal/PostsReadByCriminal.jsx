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

export default function PostsReadByCriminal() {
  const location = useLocation();

  const criminalId = location.state.id;
  const probationId = 'admin1';

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    axios
      .post('/api/v1/probation/tweet/list', {
        criminalId: 'test1',
        probationId: probationId,
      })
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
      <H1>
        <span>{uid}</span>가 조회한 마약 게시글입니다.
      </H1>
      {isLoading ? (
        <Loading />
      ) : data ? (
        <div>
          {subset.map((item, idx) => {
            return (
              <Tweet
                userName={item.Nickname}
                userId={item.User}
                tweet={item.Tweet}
                url={item.URL}
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
        <div>{uid} 조회 결과가 없습니다.</div>
      )}
    </Container>
  );
}
