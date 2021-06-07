const { nanoid } = require('nanoid');
const users = require('./users');
const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'vocal-seeker-315004',
  keyFilename: 'vocal-seeker-315004-5ed3793be29f.json',
});

const RegisterNewUser = (request, h) => {
  const { username, email, password, nama_lengkap } = request.payload;

  const user_id = nanoid(16);
  const createdAt = new Date().toISOString();
  const jenis = 'user';

  const newUser = {
    user_id,
    jenis,
    username,
    email,
    password,
    nama_lengkap,
    createdAt,
  };

  async function quickstartGetData(db) {
    const userRef = db.collection('users').doc(username);
    const doc = await userRef.get();
    if (!doc.exists) {
      quickstartAddData(db);
      async function quickstartAddData(db) {
        const docRef = db.collection('users').doc(username);
        await docRef.set(newUser);
      }
      const response = h.response({
        status: 'success',
        message: 'User telah berhasil ditambahkan',
        data: {
          username: username,
        },
      });
      response.code(201);
      return response;
    }
    if (doc.exists) {
      const response = h.response({
        status: 'fail',
        message: 'User gagal ditambahkan. Username sudah terpakai!',
      });
      response.code(500);
      return response;
    }
  }
  response = quickstartGetData(db);
  return response;
};

const loginUser = (request, h) => {
  const { username, password } = request.payload;
  async function GetDataUsernamePassword(db) {
    const userRef = db.collection('users');
    const usernameRef = await userRef.where('username', '==', username).get();
    const passwordRef = await userRef.where('password', '==', password).get();
    if (usernameRef.empty && passwordRef.empty) {
      console.log('No Matching Documents');
      const response = h
        .response({
          status: 'fail',
          message: 'Login Fail',
        })
        .code(404);
      return response;
    }

    if (usernameRef.empty || passwordRef.empty) {
      console.log('No Matching Documents');
      const response = h
        .response({
          status: 'fail',
          message: 'Login Fail, username atau password anda salah ',
        })
        .code(404);
      return response;
    }

    if (!usernameRef.empty && !passwordRef.empty) {
      console.log('Found');
      const response = h
        .response({
          status: 'success',
          message: 'Login Success',
        })
        .code(201);
      return response;
    }
    return usernameRef;
  }
  const response = GetDataUsernamePassword(db);
  console.log('aku eroornya' + response);
  return response;
};

module.exports = { RegisterNewUser, loginUser };
