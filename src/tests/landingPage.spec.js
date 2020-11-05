import React from 'react';
import { render, fireEvent, cleanup } from './test-utils';
import '@testing-library/jest-dom';
import axios from 'axios'
import Page from '../Components/LandingPage';

   afterEach(cleanup)
   test('should render the correct input form', ()=> {
      const {getByLabelText, getByTestId,  } = render(<Page />, {});
      expect(getByLabelText(/Username/i)).toHaveAttribute('type', 'text');
      expect(getByLabelText(/Password/i)).toHaveAttribute('type', 'password');
      getByTestId('signup-button');
   }) 
   test('user should be able to sign up if they have give the right info', async () => {
      const password = 'james12345';
      const userName = 'james'
      axios.post.mockImplementationOnce(() => Promise.resolve({ data: { data: { token: 'sfdgrgrgr', user: { id: 123, userName}}}}));
      const { getByTestId, getByLabelText, findByText} = render(<Page />, {});
      const userNameInput = getByLabelText(/Username/i);
      const passwordInput = getByLabelText(/Password/i);
      const button = getByTestId('signup-button');
      expect(button).toHaveTextContent(/sign up/i);
      fireEvent.change(userNameInput, { target: { value: userName}})
      fireEvent.change(passwordInput, { target: { value: password}});
      fireEvent.click(button);
      expect(button).not.toHaveTextContent(/sign up/i);
      await findByText(/sign up/i);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${process.env.BACKEND_LINK}/api/v1/user/signup`, { userName, password});
   })

   test('user should not be able to send info if the input are invalid', () => {
      const {getByLabelText, getByText} = render(<Page />, {});
      const userNameInput = getByLabelText(/Username/i);
      const passwordInput = getByLabelText(/Password/i);
      fireEvent.change(userNameInput, { target: { value: 'f'}})
      fireEvent.change(userNameInput, { target: { value: ''}})
      fireEvent.change(passwordInput, { target: { value: 'efer'}});
      expect(getByText('userName length should be greater than 0 and less than 30 character')).toBeInTheDocument();
      expect(getByText('password length should be greater than 8')).toBeInTheDocument();
      expect(axios.post).toHaveBeenCalledTimes(0);
   })

   test('user should receive an error message if there is something wrong after click the sign up button', async () => {
      const password = 'james12345';
      const userName = 'james'
      axios.post.mockImplementationOnce(() => Promise.reject({ response: { data: { data: { message: 'this is an error'}}}}));
      const { getByTestId, getByLabelText, findByText} = render(<Page />, {});
      const userNameInput = getByLabelText(/Username/i);
      const passwordInput = getByLabelText(/Password/i);
      const button = getByTestId('signup-button');
      expect(button).toHaveTextContent(/sign up/i);
      fireEvent.change(userNameInput, { target: { value: userName}})
      fireEvent.change(passwordInput, { target: { value: password}});
      fireEvent.click(button);
      expect(button).not.toHaveTextContent(/sign up/i);
      await findByText('this is an error');
   })
