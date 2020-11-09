import React from 'react';
import { render, fireEvent, screen } from './test-utils';
import '@testing-library/jest-dom';
import Routes from '../Components/Routes';

test('should open the sign up page', () => {
    render(<Routes />, {});
    screen.getByText(/register/i);
    screen.getByRole('button', { name: /sign up/i});
})
test('should open the login page', () => {
    render(<Routes />, {});
    const loginLink = screen.getByRole('link', { name: /login here/i});
    fireEvent.click(loginLink);
    screen.getByText(/login/i);
    screen.getByRole('button', { name: /sign in/i});
})
test('should show not found page', () => {
    render(<Routes />, {  route: '/fefre'});
    screen.getByText(/Page not found/i);
})
