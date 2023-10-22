import React, { Component } from 'react'

import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
  } from '@mui/material';

export default function Form(){ 
    return (
    <>
      {/* <Typography align="center" gutterBottom>
        <a
          href="https://bezkoder.com/react-hook-form-material-ui-validation"
          target="_blank"
        >
          BezKoder.com
        </a>
      </Typography> */}

      <Paper>
        <Box px={3} py={2}>
          <Typography variant="h6" align="center" margin="dense">
            Please Input your Trade Data
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="assetName"
                name="assetName"
                label="Asset Name"
                fullWidth
                margin="dense"
                // error={errors.fullname ? true : false}
                disabled
              />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.fullname?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                name="username"
                label="Description"
                fullWidth
                margin="dense"
                // {...register('username')}
                // error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.username?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Quantity"
                fullWidth
                margin="dense"
                // {...register('email')}
                // error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.email?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Price"
                type="password"
                fullWidth
                margin="dense"
                // {...register('password')}
                // error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.password?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Trade Date"
                type="password"
                fullWidth
                margin="dense"
                // {...register('confirmPassword')}
                // error={errors.confirmPassword ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.confirmPassword?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={
                  <Controller
                    control={control}
                    name="acceptTerms"
                    defaultValue="false"
                   
                    render={({ field: { onChange } }) => (
                      <Checkbox
                        color="primary"
                        onChange={(e) => onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label={
                  <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                    I have read and agree to the Terms *
                  </Typography>
                }
              /> */}
              <br />
              <Typography variant="inherit" color="textSecondary">
                {/* {errors.acceptTerms
                  ? '(' + errors.acceptTerms.message + ')'
                  : ''} */}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
            //   onClick={handleSubmit(onSubmit)}
            >
              Submit Trade
            </Button>
          </Box>
        </Box>
      </Paper>
      </>
    )

}
