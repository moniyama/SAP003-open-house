const signIn = (e) => {
  e.preventDefault();
  const email = document.querySelector('.input-email-login').value;
  const password = document.querySelector('.input-password-login').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      $('#LoginModal').modal('hide');
      window.location.hash = 'profile';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = document.querySelector('.error');
      if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
      if (errorCode === 'auth/user-disabled') errorMessage.textContent = 'Usuário desabilitado';
      if (errorCode === 'auth/user-not-found') errorMessage.textContent = 'Usuário não encontrado';
      if (errorCode === 'auth/wrong-password') errorMessage.textContent = 'Senha incorreta';
    });
};

const mediaLogin = (type) => {
  let provider;
  if (type === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  } else {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  firebase.auth().signInWithPopup(provider)
    .then((currentUser) => {
      const usersCollection = firebase.firestore().collection('users');
      usersCollection.where('user_uid', '==', currentUser.user.uid).get()
        .then((snap) => {
          if (snap.size === 0) {
            usersCollection.get()
              .then(() => {
                const user = {
                  nome: currentUser.user.displayName,
                  user_uid: currentUser.user.uid,
                  id_save: [],
                };
                firebase.firestore().collection('users').add(user);
              });
          }
        })
        .then(() => {
          $('#LoginModal').modal('hide');
        })
        .catch(() => {
          alert('Falha na autenticação');
        });
    });
};

const login = {
  signIn,
  mediaLogin,
};

export default login;
