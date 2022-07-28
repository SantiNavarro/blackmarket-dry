import { render } from '@testing-library/react';
import BasicForm from './BasicForm';

test('If BasicForm is passed showLogo, first child should be the logo', () => {
  const { container } = render(<BasicForm showLogo>Children</BasicForm>);
  expect(container.getElementsByClassName('basic-form').length).toBe(1);
  expect(container.getElementsByClassName('basic-form__logo').length).toBe(1);
});

test('If BasicForm is NOT passed showLogo, there shouldnt be an img tag in their childrens array', () => {
  const { container } = render(<BasicForm>Children</BasicForm>);
  expect(container.getElementsByClassName('basic-form').length).toBe(1);
  expect(container.getElementsByClassName('basic-form__logo').length).toBe(0);
});
