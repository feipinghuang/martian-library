import React from 'react';
import { AddItemMutation } from "./operations.graphql";
import { LibraryQuery } from "../Library/operations.graphql";
import { useMutation } from 'react-apollo';
import ProcessItemForm from "../ProcessItemForm";
import cs from './styles';

const AddItemForm = () => {
  const [addItem, { loading, data }] = useMutation(
    AddItemMutation,
    {
      update(cache, { data: { addItem } }) {
        const item = addItem.item;
        if (item) {
          const currentItems = cache.readQuery({ query: LibraryQuery });
          cache.writeQuery({
            query: LibraryQuery,
            data: {
              items: [item].concat(currentItems.items),
            },
          });
        }
      }
    }
  );
  return (
    <ProcessItemForm
      buttonText="Add Item"
      loading={loading}
      errors={data && data.addItem.errors} 
      onProcessItem={(attributes = { title, description, imageUrl }) => 
        addItem({
          variables: {
            input: { attributes }
          }
        })
      }
    />
  )
};

export default AddItemForm;