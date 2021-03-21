import { useFormik } from 'formik';
import * as yup from 'yup';

// material-ui components
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// components
import CustomerListComponent from './CustomerListComponent';
import { useState } from 'react';

// -------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  customerId: yup.number().positive().integer().required('Customer Id is required'),
  customerName: yup
    .string()
    .matches(/^[a-zA-Z_ ]+$/, 'Customer Name must be string')
    .min(3, 'Customer Name should be of minimum 3 characters length')
    .required('Customer Name is required'),
  location: yup
    .string()
    .matches(/^[a-zA-Z_ ]+$/, 'Location must be string')
    .required('Location is required'),
});
// -------------------------------------------------------------------------------------------------------

export default function FormComponent() {
  const classes = useStyles();

  const [formData, setFormData] = useState([]);
  const [isEditFormData, setIsEditFormData] = useState(false);

  // Edit data
  const editFormData = (customerRecord) => {
    setIsEditFormData(true);
    formik.setValues(customerRecord, true);
  };

  // Delete data
  const deleteFormData = (customerRecord) => {
    setFormData((prevState) => {
      return [...prevState.filter((data) => data.customerId !== customerRecord.customerId)];
    });
  };

  const formik = useFormik({
    initialValues: {
      customerId: '',
      customerName: '',
      location: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isEditFormData) {
        setFormData((prevState) => {
          let indexOfTheRecord = prevState.findIndex((data) => data.customerId === values.customerId);
          prevState.splice(indexOfTheRecord, 1, values);
          return [...prevState];
        });
      } else {
        setFormData((prevState) => [...prevState, values]);
      }

      setIsEditFormData(false);
      formik.resetForm();
    },
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ padding: '10px' }}>
        <Grid item xs={4}>
          <h2>Customer Information Form</h2>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="customerId"
              name="customerId"
              label="Customer Id"
              value={formik.values.customerId}
              onChange={formik.handleChange}
              error={formik.touched.customerId && Boolean(formik.errors.customerId)}
              helperText={formik.touched.customerId && formik.errors.customerId}
            />

            <TextField
              fullWidth
              id="customerName"
              name="customerName"
              label="Customer Name"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              error={formik.touched.customerName && Boolean(formik.errors.customerName)}
              helperText={formik.touched.customerName && formik.errors.customerName}
            />

            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />

            <Button color="primary" variant="contained" type="submit" style={{ marginTop: '5%', float: 'left' }}>
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs={4}>
          <h2>Customer List</h2>
          <CustomerListComponent formData={formData} editFormData={editFormData} deleteFormData={deleteFormData} />
        </Grid>
      </Grid>
    </div>
  );
}
