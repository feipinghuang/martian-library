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
  const [updateItem, { loading, data }] = useMutation(UpdateItemMutation);
  
  return (
    <div className={cs.overlay}>
      <div className={cs.content}>
        <ProcessItemForm
          initialImageUrl={initialImageUrl}
          initialTitle={initialTitle}
          initialDescription={initialDescription}
          buttonText="Update Item"
          loading={loading}
          errors={data && data.updateItem.errors} 
          onProcessItem={(attributes = { title, description, imageUrl }) => {
            updateItem({
              variables: {
                input: {
                  id,
                  attributes
                }
              }
            }).then(({data}) => { !data.updateItem.errors && onClose() });
            
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

