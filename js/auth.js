// STEM Village Auth Module
import { storeUser, getUser, storeSession, getSession, deleteSession } from './offline.js';

const Auth = {
  async hashPassword(password, salt) {
    const enc = new TextEncoder();
    const data = enc.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  },
  generateSalt() {
    return Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join('');
  },
  async registerUser(formData) {
    const { name, email, password, role, rollno, grade, schoolid, subject, migrateGuest } = formData;
    if (!email || !password || !name) return { success: false, error: 'Missing required fields.' };
    const existing = await getUser(email);
    if (existing) return { success: false, error: 'Email already registered.' };
    const salt = this.generateSalt();
    const passwordHash = await this.hashPassword(password, salt);
    const userData = {
      name,
      role,
      passwordHash,
      salt,
      created: Date.now(),
      lastLogin: null,
      extraFields: role === 'student' ? { rollno, grade } : { schoolid, subject }
    };
    await storeUser(email, userData);
    // Guest migration
    if (migrateGuest && window.GuestAccessManager) {
      await window.GuestAccessManager.migrateToRegistered({ email });
    }
    // Create session
    const token = this.generateSalt() + Date.now();
    await storeSession(token, { email, created: Date.now(), expires: Date.now() + 7*24*60*60*1000 });
    localStorage.setItem('sv_current_user', email);
    localStorage.setItem('sv_user_role', role);
    localStorage.setItem('sv_session_token', token);
    return { success: true, user: userData, token };
  },
  async loginUser(email, password, options = {}) {
    const user = await getUser(email);
    if (!user) return { success: false, error: 'Account not found.' };
    const hash = await this.hashPassword(password, user.salt);
    if (hash !== user.passwordHash) return { success: false, error: 'Incorrect password.' };
    const token = this.generateSalt() + Date.now();
    await storeSession(token, { email, created: Date.now(), expires: Date.now() + (options.remember ? 30 : 7)*24*60*60*1000 });
    localStorage.setItem('sv_current_user', email);
    localStorage.setItem('sv_user_role', user.role);
    localStorage.setItem('sv_session_token', token);
    return { success: true, user, token };
  },
  async logout() {
    const token = localStorage.getItem('sv_session_token');
    if (token) await deleteSession(token);
    localStorage.removeItem('sv_current_user');
    localStorage.removeItem('sv_user_role');
    localStorage.removeItem('sv_session_token');
  },
  async getCurrentUser() {
    const email = localStorage.getItem('sv_current_user');
    return email ? await getUser(email) : null;
  },
  isLoggedIn() {
    return !!localStorage.getItem('sv_session_token');
  }
};

window.Auth = Auth;
export default Auth;
