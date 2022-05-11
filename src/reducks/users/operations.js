import { signInAction, singOutAction } from './actions';
import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';

const usersRef = db.collection('users');

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('必須項目が未入力です。');
      return false;
    }
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;
        usersRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
            dispatch(push('/'));
          });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('必須項目が未入力です。');
      return false;
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度お試しください。');
      return false;
    }
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();
          const userInitialDate = {
            customer_id: '',
            created_at: timestamp,
            email: email,
            role: 'customer',
            uid: uid,
            updated_at: timestamp,
            username: username,
          };

          usersRef
            .doc(uid)
            .set(userInitialDate)
            .then(() => {
              dispatch(push('/'));
            });
        }
      });
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        usersRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          })
          .catch((err) => {
            throw new Error('アラーダオ', err);
          });
      } else {
        dispatch(push('/signin'));
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(singOutAction());
      dispatch(push('/signin'));
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (!email) {
      alert('必須項目が未入力です。');
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          dispatch(push('/'));
        })
        .catch((err) => {
          // const errorCode = err.code;
          // const errorMessage = err.message;
          throw new Error('何かしらのエラーが起きたよ。詳細はこちら→', err);
        });
    }
  };
};
