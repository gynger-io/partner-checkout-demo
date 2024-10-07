import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createDeal, updateOffer, updateSession } from '../utils/api-facade';
import Modal from '@mui/material/Modal';
import { Deal } from '@shared/Deal';
import { OfferStatus } from '@shared/status';

export default function ChangeStatusButton({ deal, onComplete }: { deal: Deal; onComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(deal.offerStatus);

  const updateStatus = async () => {
    try {
      if (deal.offerId) {
        await updateOffer(deal.offerId, selectedStatus);
      } else {
        await updateSession(deal.checkoutId, selectedStatus);
      }
      onComplete();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.toString());
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Change Status</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby='modal-modal-title'>
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
                Change Status
              </Typography>
            </CardContent>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateStatus();
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='controlled-radio-buttons-group'
                  value={selectedStatus}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSelectedStatus(event.target.value)}
                >
                  {deal.offerId
                    ? OfferStatus.map((s) => <FormControlLabel key={s} value={s} control={<Radio />} label={s} />)
                    : [
                        <FormControlLabel key='Exp' value='EXPIRED' control={<Radio />} label='EXPIRED' />,
                        <FormControlLabel key='oc' value='OFFER_CREATED' control={<Radio />} label='OFFER_CREATED' />,
                      ]}
                </RadioGroup>
                <Button type='submit'>Submit</Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
