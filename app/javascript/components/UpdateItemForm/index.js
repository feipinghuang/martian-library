import React from 'react';
import { useMutation } from 'react-apollo';
import ProcessItemForm from '../ProcessItemForm';
import { UpdateItemMutation } from "./operations.graphql";
import cs from './styles';

const UpdateItemForm = ({
  id,
  initialTitle,
  initialDescription,
  initialImageUrl,
  onClose
}) => {
  const [updateItem, { loading }] = useMutation(UpdateItemMutation);
  
  return (
    <div className={cs.overlay}>
      <div className={cs.content}>
        <ProcessItemForm
          initialImageUrl={initialImageUrl}
          initialTitle={initialTitle}
          initialDescription={initialDescription}
          buttonText="Update Item"
          loading={loading}
          onProcessItem={(item = { title, description, imageUrl }) => {
            updateItem({
              variables: {
                input: {
                  id,
                  ...item
                }
              },
              optimisticResponse: {
                __typename: "Mutation",
                updateItem: {
                  __typename: "UpdateItemPayload",
                  item: {
                    id,
                    __typename: "Item",
                    ...item
                  }
                }
              }
            });
            onClose();
          }}
        />
        <button className={cs.close} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
};

export default UpdateItemForm;

