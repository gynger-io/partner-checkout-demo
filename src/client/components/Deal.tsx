import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Deal } from '@shared/Deal';

interface IProps {
  deal: Deal;
}

export const Deal: React.FC<IProps> = ({ deal }) => (
  <Card data-testid='user-card'>
    <CardHeader data-testid='user-card-header' title={`Deal: ${deal.name}`} />
    <CardContent>
      <Typography>Id: {deal.id}</Typography>
      <Typography>Status: {deal.status}</Typography>
    </CardContent>
  </Card>
);
