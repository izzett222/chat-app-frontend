import React from 'react';
import axios from 'axios'
import { render, fireEvent, screen, waitFor } from './test-utils';
import '@testing-library/jest-dom';
import JoinChat from '../Components/chat/JoinChat';

test('should have a Input element and button', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: { user: { id: 5, userName: 'james' }} } }));
    render(<JoinChat />, {});
    await screen.findByText(/james/i);
    screen.getByLabelText(/username/i);
    screen.getByRole('button', { name: /chat/i});
    screen.getByRole('button', { name: /log out/i})
})

test('should return error message if the user is trying to search themselves or user who doesn\'t exist', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: { user: { id: 5, userName: 'james' }} } }))
        .mockImplementationOnce(() => Promise.reject({ response: { data: { data: { message: 'this is an error' } } } }));
    render(<JoinChat />, {});
    await screen.findByText(/james/i);
    const input = screen.getByLabelText(/username/i);
    fireEvent.change(input, { target: { value: 'james' }});
    const button = screen.getByRole('button', { name: /chat/i});
    screen.getByRole('button', { name: /log out/i});
    fireEvent.click(button);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    screen.getByText(/this is an error/i);
})
test('should return error message if the user is trying to search themselves or user who doesn\'t exist', async () => {
    const token = 'dergergergregre'
    localStorage.setItem('token', token)
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: { user: { id: 5, userName: 'james' }} } }))
        .mockImplementationOnce(() => Promise.resolve({ data: { data: { friend: { id: 5, userName: 'james' } } } }));
    render(<JoinChat />, {});
    await screen.findByText(/james/i);
    const input = screen.getByLabelText(/username/i);
    fireEvent.change(input, { target: { value: 'dereck' }});
    const button = screen.getByRole('button', { name: /chat/i});
    fireEvent.click(button);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    expect(axios.get).toHaveBeenLastCalledWith(`${process.env.BACKEND_LINK}/api/v1/chat/join/dereck`, { headers: { token}})
})
