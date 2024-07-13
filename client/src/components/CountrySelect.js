import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countries from './countries'; // Make sure to import your countries data
import { useTheme } from '@mui/material/styles';

export default function CountrySelect({ onCountrySelect }) {
  const theme = useTheme();

  // Check if the countries data is empty or still loading
  const isLoading = !countries || countries.length === 0;

  // Ensure options is always an array
  const options = isLoading ? [{ label: 'Loading...', id: 0 }] : countries;

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{
        width: 150,
        marginTop:'1rem'
      }}
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label || ''}

      //getting the country code passing to append it through mobile number on registration.js
      onChange={(_, selectedOption) => {
        onCountrySelect(selectedOption);
      }}

      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const countryCode = option.code || ''; // Handle missing code property
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } ,color: theme.palette.text.secondary,}}
            {...optionProps}
            data-country-code={countryCode}
          >
            {countryCode && (
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                alt=""
              />
            )}
            {option.label} ({countryCode}) +{option.phone}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country Code"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
            style: {
              color: theme.palette.text.secondary, // Set the text color for the input
            },
          }}
        />
      )}
    />
  );
}
