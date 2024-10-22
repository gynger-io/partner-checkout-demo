import Modal from '@mui/material/Modal';
import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';

export const CheckoutButtonSettingsModal = ({
  isOpen,
  close,
  settings,
  updateSettings,
}: {
  isOpen: boolean;
  close: () => void;
  updateSettings: (data: any) => void;
  settings: any;
}) => {
  console.log(settings);
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
                close();
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  value={settings.size}
                  onChange={(size) => updateSettings({ ...settings, size: size.target.value })}
                  autoWidth
                  label='Size'
                >
                  <MenuItem value={'small'}>Small</MenuItem>
                  <MenuItem value={'medium'}>Medium</MenuItem>
                  <MenuItem value={'large'}>Large</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel>Border Radius</InputLabel>
                <Select
                  value={settings.borderRadius}
                  onChange={(borderRadius) => updateSettings({ ...settings, borderRadius: borderRadius.target.value })}
                  autoWidth
                  label='Border Radius'
                >
                  <MenuItem value={'none'}>None</MenuItem>
                  <MenuItem value={'slight'}>Slight</MenuItem>
                  <MenuItem value={'round'}>Round</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={settings.theme}
                  onChange={(theme) => updateSettings({ ...settings, theme: theme.target.value })}
                  autoWidth
                  label='Theme'
                >
                  <MenuItem value={'dark'}>Dark</MenuItem>
                  <MenuItem value={'light'}>Light</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel>Border</InputLabel>
                <Select
                  value={settings.border}
                  onChange={(border) => updateSettings({ ...settings, border: border.target.value })}
                  autoWidth
                  label='Border'
                >
                  <MenuItem value={'solid'}>Solid</MenuItem>
                  <MenuItem value={'none'}>None</MenuItem>
                </Select>
              </FormControl>
              <Button type='submit'>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
