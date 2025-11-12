import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { Deal } from '@shared/Deal';
import { createDeal, deleteDeal, loadDealsAPI } from '../utils/api-facade';
import { Box, Checkbox, FormControlLabel, Switch, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import CheckoutButton from './CheckoutButton';
import ChangeStatusButton from './ChangeStatusButton';
import { CreateDealModal } from './CreateDealModal';
import { CheckoutButtonSettingsModal } from './CheckoutButtonSettingsModal';

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */
  class GyngerCheckout {
    static initWidget(props: any);
  }
}

export const DealList: React.FC = () => {
  const [deals, setDeals] = React.useState<Deal[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);
  const [previewEnabled, setPreviewEnabled] = React.useState(true);
  const [settings, updateSettings] = useState({
    size: 'small', // Options: 'small', 'medium', 'large' (default: 'medium')
    borderRadius: 'none', // Options: 'none', 'slight', 'round' (default: 'none')
    theme: 'dark', // Options: 'light', 'dark' (default: 'dark')
    border: 'solid', // Options: 'solid', 'none' (default: 'none')
  });

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
    { field: 'offerStatus', headerName: 'Status', width: 100 },
    { field: 'accountStatus', headerName: 'Account Status', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      getActions: (params: GridRowParams<Deal>) => {
        return [
          <ChangeStatusButton key='status' deal={params.row} onComplete={reloadDeals} />,
          <CheckoutButton
            key={`key_${params.row.checkoutId}`}
            deal={params.row}
            settings={settings}
            previewEnabled={previewEnabled}
          />,
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
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Button variant='contained' onClick={() => setModalOpen(true)}>
          Create Deal
        </Button>
        <Button variant='outlined' onClick={() => setSettingsModalOpen(true)}>
          Update Button Styles
        </Button>
        <FormControlLabel
          control={
            <Switch checked={previewEnabled} onChange={(e) => setPreviewEnabled(e.target.checked)} color='primary' />
          }
          label='Preview Enabled'
        />
      </Box>
      <Card>
        <CardHeader title='Deals List' />
        <CardContent>
          {deals ? <DataGrid rows={deals} columns={columns} sx={{ border: 0 }} /> : 'No Deals found'}
        </CardContent>
      </Card>
      <CheckoutButtonSettingsModal
        isOpen={settingsModalOpen}
        close={() => setSettingsModalOpen(false)}
        updateSettings={updateSettings}
        settings={settings}
      />
      <CreateDealModal isOpen={modalOpen} close={() => setModalOpen(false)} onComplete={reloadDeals} />
    </Grid>
  );
};
