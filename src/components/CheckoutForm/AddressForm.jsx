import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import { useForm, FormProvider } from "react-hook-form";
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

const AddressForm = ({ checkoutToken, next }) => {
    const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

 const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}))
 const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name}))
 const options = shippingOptions.map((shipOpt) => ({id: shipOpt.id, label: `${shipOpt.description} - (${shipOpt.price.formatted_with_symbol})`}))

// FETCH SHIPPING COUNTRIES
const fetchShippingCountries = async (checkoutTokenId) =>{
   const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

   setShippingCountries(countries);
   setShippingCountry(Object.keys(countries)[0])
}

// FETCH SUBDIVISIONS OF COUNTRIES
const fetchSubdivisions = async (countryCode) =>{
   const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

   setShippingSubdivisions(subdivisions);
   setShippingSubdivision(Object.keys(subdivisions)[0])
}

//FETCH SHIPPING OPTIONS
const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
   const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

   // console.log('====================================');
   // console.log('options', options);
   // console.log('====================================');
  setShippingOptions(options);
  setShippingOption(options[0].id)
}

useEffect(() => {
   fetchShippingCountries(checkoutToken.id);
   
}, []);


useEffect(() =>{
   if (shippingCountry) fetchSubdivisions(shippingCountry);
}, [shippingCountry]);

useEffect(() =>{
   if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
}, [shippingSubdivision])


    return (
        <>
          <Typography variant="h6" gutterBottom>
             Shipping Address
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption}) )}>
              <Grid container spacing={3}>
                 <FormInput  name='firstName' label='First name' />
                 <FormInput  name='lastName' label='Last name' />
                 <FormInput  name='address' label='Address' />
                 <FormInput  name='email' label='E-mail' />
                 <FormInput  name='city' label='City' />
                 <FormInput  name='zip' label='Zip / Postal Code' />
                <Grid item xs={12} sm={6}>
                   <InputLabel>Shipping Country</InputLabel>
                   <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                     {countries.map((country)=> (
                        <MenuItem key={country.id} value={country.id}>
                           {country.label}
                        </MenuItem>
                     ))}
                   </Select>
                </Grid>
                 <Grid item xs={12} sm={6}>
                   <InputLabel>Shipping Subdivision</InputLabel>
                   <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                     {subdivisions.map((subdivision)=> (
                        <MenuItem key={subdivision.id} value={subdivision.id}>
                           {subdivision.label}
                        </MenuItem>
                     ))}
                   </Select>
                </Grid>
                 <Grid item xs={12} sm={6}>
                   <InputLabel>Shipping Options</InputLabel>
                   <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                       {options.map((option)=> (
                        <MenuItem key={option.id} value={option.id}>
                           {option.label}
                        </MenuItem>
                     ))}
                   </Select>
                </Grid>
              </Grid>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20}}>
                <Button variant="outlined" component={Link} to="/cart">Back to cart</Button>
                <Button variant="contained" type="submit" color="primary" > Next</Button>
              </div>
            </form>
          
          </FormProvider>
        </>
    )
}

export default AddressForm
