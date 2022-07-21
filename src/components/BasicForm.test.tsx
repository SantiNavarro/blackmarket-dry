import { render, screen } from '@testing-library/react';
import BasicForm from './BasicForm';

test('If BasicForm is passed showLogo, first child should be an image', () => {
  const { container } = render(<BasicForm showLogo>Children</BasicForm>);
  expect(container.getElementsByClassName('basic-form').length).toBe(1);
  const logo = screen.getByRole('img');
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute('alt', 'basic-form__logo');
});

test('If BasicForm is NOT passed showLogo, there shouldnt be an img tag in their childrens array', () => {
  const { container } = render(<BasicForm>Children</BasicForm>);
  expect(container.getElementsByClassName('basic-form').length).toBe(1);
  expect(container.getElementsByClassName('basic-form__logo').length).toBe(0);
});
