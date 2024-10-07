import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from 'react';
import { Deal } from '@shared/Deal';
import { createDeal, deleteDeal, loadDealsAPI } from '../utils/api-facade';
import { Box, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import CheckoutButton from './CheckoutButton';
import ChangeStatusButton from './ChangeStatusButton';

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */
  class GyngerCheckout {
    constructor(props: any);
  }
}

export const DealList: React.FC = () => {
  const [deals, setDeals] = React.useState<Deal[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [data, setData] = React.useState<any>({});
  const setAmountDollars = (amountDollars: number) => setData({ ...data, amountDollars });
  const setProductDescription = (productDescription: string) => setData({ ...data, productDescription });

  const reloadDeals = async () => {
    const deals = await loadDealsAPI();
    setDeals(deals);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      reloadDeals();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'offerStatus', headerName: 'Status', flex: 1 },
    { field: 'accountStatus', headerName: 'Account Status', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      width: 300,
      getActions: (params: GridRowParams<Deal>) => {
        return [
          <ChangeStatusButton key='status' deal={params.row} onComplete={reloadDeals} />,
          <CheckoutButton key='cehk' deal={params.row} />,
        ];
      },
    },
    {
      width: 100,
      field: 'delete',
      type: 'actions',
      getActions: (params: GridRowParams<Deal>) => {
        return [
          <GridActionsCellItem
            label='Delete'
            key='delete'
            icon={<DeleteIcon />}
            onClick={() => {
              deleteDeal(params.row.id).then(() => reloadDeals());
            }}
          />,
        ];
      },
    },
  ];

  React.useEffect(() => {
    let cancelled = false;
    const fetchDeals = async () => {
      setIsLoading(true);
      const Deals = await loadDealsAPI();
      if (!cancelled) {
        setDeals(Deals);
        setIsLoading(false);
      }
    };

    fetchDeals();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid item xs={12}>
      <Button onClick={() => setModalOpen(true)}>Create Deal</Button>
      <Card>
        <CardHeader title='Deals List' />
        <CardContent>
          {deals ? <DataGrid rows={deals} columns={columns} sx={{ border: 0 }} /> : 'No Deals found'}
        </CardContent>
      </Card>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} aria-labelledby='modal-modal-title'>
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
                    await reloadDeals();
                    setModalOpen(false);
                  });
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <TextField
                  onInput={(e) => setAmountDollars(parseInt(e.target.value, 10))}
                  type='text'
                  inputProps={{ type: 'number' }}
                  placeholder=''
                  name='amountDollars'
                  label='Amount In Dollars'
                />
                <TextField
                  onInput={(e) => setProductDescription(e.target.value)}
                  type='text'
                  placeholder=''
                  name='productDescription'
                  label='Product Description'
                />
                <Button type='submit'>Submit</Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Grid>
  );
};
