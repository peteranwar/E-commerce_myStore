import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import {  Grid, TextField} from '@material-ui/core'

const FormInput = ({ name, label }) => {
   const {control} = useFormContext();


    return (
        <Grid item xs={12} sm={6}>
          <Controller
             as={TextField}
             control={control}
             fullWidth
             name={name}
             label={label}
             required
             defaultValue=""
             
          />
        </Grid>
    )
}

export default FormInput;
