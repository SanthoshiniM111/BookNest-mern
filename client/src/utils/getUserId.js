function getUserId() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.id || null;
  } catch (err) {
    console.error("❌ Invalid token", err);
    return null;
  }
}

export default getUserId; // ✅ default export
