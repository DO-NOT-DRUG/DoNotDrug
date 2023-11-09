import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';

import { Container, Title } from '@/components'
import Loading from '@/components/Loading/Loading';


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #6B4EFF;
  color: #fff;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  width: ${props => props.width};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;


const requestUserData = async () => {
  try {
    const response = await axios.get('/api/probation/list');
    return response.data;
  } catch {
    alert('Error: ', error);
    return [];
  }
};


function AdminMain() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    requestUserData().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return(
    <Container as="section" align="center" >
      <Title as="h2" titleStyle="XXL" align="center">마약사범 리스트</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell width="25%">이름</TableHeaderCell>
              <TableHeaderCell width="40%">이메일</TableHeaderCell>
              <TableHeaderCell width="35%">가입 날짜</TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
              </TableRow> 
            ))}
          </tbody>
        </Table>
      )}
    </Container>

  )
}


export default AdminMain;