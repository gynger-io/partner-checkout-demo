import { Deal } from '@shared/Deal';
import React, { useEffect } from 'react';

export default function CheckoutButton(props: { deal: Deal }) {
  useEffect(() => {
    GyngerCheckout.initWidget({
      token: props.deal.checkoutId, // Replace with actual token returned from createCheckoutSession request
      containerId: `gynger-checkout-widget-${props.deal.offerId}`,
      mode: 'sandbox', // Options: 'sandbox', 'production' (default: 'production')
      onError: (message) => {
        console.error(message);
        alert('Error: ' + message.toString());
      },
      styles: {
        size: 'small', // Options: 'small', 'medium', 'large' (default: 'medium')
        borderRadius: 'none', // Options: 'none', 'slight', 'round' (default: 'none')
        theme: 'dark', // Options: 'light', 'dark' (default: 'dark')
        border: 'solid', // Options: 'solid', 'none' (default: 'none')
      },
    });
  }, []);
  return <div id={`gynger-checkout-widget-${props.deal.offerId}`} />;
}
