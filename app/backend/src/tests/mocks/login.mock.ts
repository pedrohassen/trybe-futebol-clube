const emailPass = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const email = {
  email: 'admin@admin.com'
}

const pass = {
  password: 'secret_admin'
}

const wrongEmail = {
  email: 'amin@admin.com',
  password: 'secret_admin'
}

const wrongPass = {
  email: 'admin@admin.com',
  password: 'secret_amin'
}

const user = {
    id: 1,
    name: 'Admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    role: 'Admin',
  }

const dbUser = {
  dataValues: {
    id: 1,
    name: 'Admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    role: 'Admin',
  }
}

export default {
  emailPass,
  email,
  pass,
  wrongEmail,
  wrongPass,
  user,
  dbUser,
}
