import { Deal } from '@shared/Deal';
import React, { useEffect } from 'react';
const GYNGER_PUBLIC_KEY: string = 'pk_test_27b46c134d60e2d001a4e95425db7f8c';

export default function CheckoutButton(props: { deal: Deal; settings: any }) {
  useEffect(() => {
    const myNode = document.getElementById(`gynger-checkout-widget-${props.deal.checkoutId}`);
    myNode.innerHTML = '';
    GyngerCheckout.initWidget({
      token: props.deal.checkoutId, // Replace with actual token returned from createCheckoutSession request
      containerId: `gynger-checkout-widget-${props.deal.checkoutId}`,
      publicKey: GYNGER_PUBLIC_KEY,
      onError: (message) => {
        console.error(message);
        alert('Error: ' + message.toString());
      },
      styles: props.settings,
    });
  }, [props.settings]);
  return <div id={`gynger-checkout-widget-${props.deal.checkoutId}`} />;
}
