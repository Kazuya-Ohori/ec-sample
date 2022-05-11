import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, PrimaryButton } from '../components/UIkit';
import { resetPassword } from '../reducks/users/operations';
import { push } from 'connected-react-router';

const Reset = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <div className='c-section-container'>
      <h2 className='u-text__headline u-text-center'>パスワードを再設定する</h2>
      <div className='module-spacer--medium' />
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <div className='center'>
        <div className='module-spacer--medium' />
        <PrimaryButton
          label={'Reset Password'}
          onClick={() => dispatch(resetPassword(email))}
        />
        <p onClick={() => dispatch(push('/signup'))}>
          アカウント登録をお済みでない方はこちら
        </p>
      </div>
    </div>
  );
};

export default Reset;
