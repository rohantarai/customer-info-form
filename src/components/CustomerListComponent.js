import { BsTrashFill, BsPencil } from 'react-icons/bs';

export default function CustomerListComponent({ formData, editFormData, deleteFormData }) {
  const handleEdit = (data) => {
    editFormData(data);
  };

  const handleDelete = (data) => {
    deleteFormData(data);
  };

  return (
    <>
      {formData.length > 0 &&
        formData.map((data) => (
          <div key={data.customerId} style={{ width: '20vw', padding: '10px', border: '1px solid grey', borderRadius: '5px', marginBottom: '5px' }}>
            <p style={{ margin: 0 }}>Customer Name: {data.customerId}</p>
            <p style={{ margin: 0 }}>Customer Name: {data.customerName}</p>
            <p style={{ margin: 0 }}>Location: {data.location}</p>
            <BsTrashFill onClick={() => handleDelete(data)} style={{ cursor: 'pointer' }} />
            <BsPencil onClick={() => handleEdit(data)} style={{ marginLeft: '5px', cursor: 'pointer' }} />
          </div>
        ))}
    </>
  );
}
