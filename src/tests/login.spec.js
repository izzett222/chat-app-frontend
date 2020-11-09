import React from 'react';
import { render, fireEvent, screen, cleanup } from './test-utils';
import '@testing-library/jest-dom';
import axios from 'axios'
import LoginPage from '../Components/login/Login';

afterEach(cleanup)

test('should render the login button and input form', () => {
    render(<LoginPage />);
    screen.queryByText(/sign in/i);
    screen.queryByLabelText(/Username/i);
    screen.queryByLabelText(/Password/i);
})


test('should sign in a user after entering the right data', async () => {
    render(<LoginPage />)
    const password = 'james12345';
    const userName = 'james'
    axios.post.mockImplementationOnce(() => Promise.resolve({ data: { data: { token: 'sfdgrgrgr', user: { id: 123, userName}}}}));
    const userNameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByText(/sign in/i);
    fireEvent.change(userNameInput, { target: { value: userName}})
    fireEvent.change(passwordInput, { target: { value: password}});
    expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(button).not.toHaveTextContent(/sign in/i);
    await screen.findByText(/sign in/i);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${process.env.BACKEND_LINK}/api/v1/user/login`, { userName, password});
})
test('should show an error message if the user doesn\'t provide input data', () => {
    render(<LoginPage />, {});
    const userNameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByText(/sign in/i);
    fireEvent.change(userNameInput, { target: { value: ''}})
    fireEvent.change(passwordInput, { target: { value: ''}});
    expect(screen.queryByText(/username is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).toBeInTheDocument();
    fireEvent.click(button);
    expect(axios.post).toHaveBeenCalledTimes(0);
})
test('user should receive an error message if there is server error after clicking the sign in button', async () => {
    const password = 'james1234567';
    const userName = 'james'
    axios.post.mockImplementationOnce(() => Promise.reject({ response: { data: { data: { error: 'this is an error'}}}}));
    render(<LoginPage />, {});
    const userNameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByText(/sign in/i);
    fireEvent.change(userNameInput, { target: { value: userName}})
    fireEvent.change(passwordInput, { target: { value: password}});
    fireEvent.click(button);
    
    expect(button).not.toHaveTextContent(/sign in/i);
    await screen.findByText(/sign in/i);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${process.env.BACKEND_LINK}/api/v1/user/login`, { userName, password});
    screen.getByText('this is an error');
 })
