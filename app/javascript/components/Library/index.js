import React, { useState } from 'react';
import { LibraryQuery } from "./operations.graphql";
import { useQuery, useMutation } from 'react-apollo';
import cs from './styles';
import UpdateItemForm from '../UpdateItemForm';

const Library = () => {
  const [item, setItem] = useState(null);
  const { loading, data } = useQuery(LibraryQuery);
  return (
    <div className={cs.library}>
      {(loading || !data.items)
        ? 'loading...'
        : data.items.map(({id, title, description, imageUrl, user}) => (
          
            <button
              key={id}
              className={cs.plate}
              onClick={() => setItem({ title, imageUrl, id, description })}
            >
              <div className={cs.title}>{title}</div>
              <div>{description}</div>
              {imageUrl && <img src={imageUrl} className={cs.image} />}
              {user ? (
                <div className={cs.user}>added by {user.email}</div>
              ) : null}
            </button>        
        ))
      }
      {
        item !== null && (
          <UpdateItemForm
            id={item.id}
            initialTitle={item.title}
            initialDescription={item.description}
            initialImageUrl={item.imageUrl}
            onClose={() => setItem(null)}
          />
        )
      }
    </div>
  );
};

export default Library;