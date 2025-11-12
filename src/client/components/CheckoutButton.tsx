import { Deal } from '@shared/Deal';
import React, { useEffect } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    APP_CONFIG: {
      GYNGER_PUBLIC_KEY: string;
    };
  }
}

export default function CheckoutButton(props: { deal: Deal; settings: any }) {
  useEffect(() => {
    const myNode = document.getElementById(`gynger-checkout-widget-${props.deal.checkoutId}`);
    myNode.innerHTML = '';
    GyngerCheckout.initWidget({
      token: props.deal.checkoutId, // Replace with actual token returned from createCheckoutSession request
      containerId: `gynger-checkout-widget-${props.deal.checkoutId}`,
      publicKey: window.APP_CONFIG.GYNGER_PUBLIC_KEY,
      previewEnabled: true,
      onError: (error: Error) => {
        console.error(error.message);
        alert(`Error: ${error.message}`);
      },
      styles: props.settings,
    });
  }, [props.settings]);
  return <div id={`gynger-checkout-widget-${props.deal.checkoutId}`} />;
}
