// eslint-disable-next-line import/prefer-default-export
export const pickRoute = (value: string) => {
  const routes: any = {
    'My Account': '/my-account',
    'Cart history': '/cart-history',
    'Payment methods': '/payment-methods',
    'Log out': '/sign-in',
  };
  return routes[value] || '/';
};
