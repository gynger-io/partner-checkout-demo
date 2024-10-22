import { Deal } from '@shared/Deal';
import React, { useEffect } from 'react';

export default function CheckoutButton(props: { deal: Deal; settings: any }) {
  useEffect(() => {
    const myNode = document.getElementById(`gynger-checkout-widget-${props.deal.offerId}`);
    myNode.innerHTML = '';
    GyngerCheckout.initWidget({
      token: props.deal.checkoutId, // Replace with actual token returned from createCheckoutSession request
      containerId: `gynger-checkout-widget-${props.deal.offerId}`,
      mode: 'sandbox', // Options: 'sandbox', 'production' (default: 'production')
      onError: (message) => {
        console.error(message);
        alert('Error: ' + message.toString());
      },
      styles: props.settings,
    });
  }, [props.settings]);
  return <div id={`gynger-checkout-widget-${props.deal.offerId}`} />;
}
