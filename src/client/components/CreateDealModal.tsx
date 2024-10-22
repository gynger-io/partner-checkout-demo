import Modal from '@mui/material/Modal';
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createDeal } from '../utils/api-facade';
import Button from '@mui/material/Button';
import React from 'react';

export const CreateDealModal = ({
  isOpen,
  close,
  onComplete,
}: {
  isOpen: boolean;
  close: () => void;
  onComplete: () => Promise<void>;
}) => {
  const [data, setData] = React.useState<any>({
    autoBillCreation: true,
  });
  const setAmount = (amount: number) => setData({ ...data, amount });
  const setProductDescription = (productDescription: string) => setData({ ...data, productDescription });
  const setExpirationDate = (expirationDate: string) => setData({ ...data, expirationDate });
  const setBuyerEmail = (buyerEmail: string) => setData({ ...data, buyerEmail });
  const setAutoBillCreation = (autoBillCreation: string) => setData({ ...data, autoBillCreation });

  return (
    <Modal open={isOpen} onClose={close} aria-labelledby='modal-modal-title'>
      <Box
        style={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          p: 4,
        }}
      >
        <Card>
          <CardContent>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Create Deal
            </Typography>
          </CardContent>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createDeal(data).then(async () => {
                  setData({});
                  await onComplete();
                  close();
                });
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              <TextField
                onInput={(e) => setAmount(parseInt(e.target.value, 10))}
                type='text'
                inputProps={{ type: 'number' }}
                placeholder=''
                name='amount'
                label='Amount In Pennies'
              />
              <TextField
                onInput={(e) => setProductDescription(e.target.value)}
                type='text'
                placeholder=''
                name='productDescription'
                label='Product Description'
              />
              <TextField
                onInput={(e) => setBuyerEmail(e.target.value)}
                type='text'
                placeholder=''
                name='buyerEmail'
                label='Buyer Email'
              />
              <TextField
                onInput={(e) => setExpirationDate(e.target.value)}
                type='text'
                placeholder='yyyy-mm-dd'
                name='expirationDate'
                label='Expiration Date'
              />
              <FormControlLabel
                label='Auto Bill Creation'
                control={<Checkbox defaultChecked onChange={(e) => setAutoBillCreation(e.target.checked)} />}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
