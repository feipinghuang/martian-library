import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const LibraryQuery = gql`
  {
    items {
      id
      title
      user {
        email
      }
    }
  }
`;

export default () => {
  const { loading, data } = useQuery(LibraryQuery);

  if (loading) return <p>Loading...</p>;
  
  return data.items.map(({ id, title, user }) => (
    <div key={id}>
      <b>{title}</b> {user ? `added by ${user.email}` : null}
    </div>
  ));
}