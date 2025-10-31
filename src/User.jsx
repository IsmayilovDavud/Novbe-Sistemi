const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();

    const foundUser = users.find(
      (u) => u.login === formData.login && u.pass === formData.pass
    );

    if (foundUser) {
      onLogin(foundUser);
    } else {
      setMessage("❌ Yanlış login və ya şifrə!");
    }
  } catch (err) {
    setMessage("⚠️ Serverə qoşulmaq mümkün olmadı!");
  }
};
