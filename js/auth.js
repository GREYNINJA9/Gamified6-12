// --- Student Account Creation and Login ---
function generateStudentPassword(name, studentId){
  const prefix = (name||'').trim().toLowerCase().replace(/[^a-z]/g,'').slice(0,3).padEnd(3,'x');
  const idPart = String(studentId).replace(/\s+/g,'');
  return `${prefix}${idPart}`;
}

async function createStudentAccount({ name, studentId, grade, email }, teacherId){
  const identifier = email || `${studentId}@students.local`;
  if (await getUser(identifier)) return { success:false, error:'Student identifier already exists.' };
  const password = generateStudentPassword(name, studentId);
  const salt = Auth.generateSalt();
  const passwordHash = await Auth.hashPassword(password, salt);
  const userData = { name, role:'student', passwordHash, salt, created: Date.now(), lastLogin:null, extraFields:{ rollno: studentId, grade, teacherId } };
  await storeUser(identifier, userData);
  return { success:true, user:userData, credentials:{ username: identifier, password } };
}

async function bulkCreateStudents(students, teacherId){
  const results = [];
  for (const s of students){
    try { results.push({ studentId: s.studentId, ...(await Auth.createStudentAccount(s, teacherId)), error: null }); }
    catch (e) { results.push({ studentId: s.studentId, success:false, error: e.message }); }
  }
  return results;
}

async function loginStudentById(studentId, password){
  const identifier = `${studentId}@students.local`;
  return Auth.loginUser(identifier, password);
}

// Attach to Auth object
Auth.generateStudentPassword = generateStudentPassword;
Auth.createStudentAccount = createStudentAccount;
Auth.bulkCreateStudents = bulkCreateStudents;
Auth.loginStudentById = loginStudentById;
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
    const hash = await this.hashPassword(password, user.salt);
    if (hash !== user.passwordHash) return { success: false, error: 'Incorrect password.' };
    const token = this.generateSalt() + Date.now();
    await storeSession(token, { email, created: Date.now(), expires: Date.now() + (options.remember ? 30 : 7)*24*60*60*1000 });
    localStorage.setItem('sv_current_user', email);
    localStorage.setItem('sv_user_role', user.role);
    localStorage.setItem('sv_session_token', token);
    return { success: true, user, token };
  },
  /**
   * Returns the current user role from localStorage (student, teacher, or null).
   * @returns {string|null}
   */
  getCurrentRole() {
    return localStorage.getItem('sv_user_role') || null;
  },

  /**
   * Logs out the current user, clears session/localStorage, and returns the user role before logout.
   * @returns {Promise<string>} Resolves to user role ('student', 'teacher', or null)
   */
  /**
   * Enhanced logout: returns role and optionally redirects.
   * @param {Object} [options] - Optional settings.
   * @param {boolean} [options.redirect] - If true, redirect after logout.
   * @returns {Promise<string>} Resolves to user role ('student', 'teacher', or null)
   */
  async logout(options = {}) {
    let role = this.getCurrentRole();
    try {
      const token = localStorage.getItem('sv_session_token');
      if (token) {
        try { await deleteSession(token); } catch (e) { /* ignore session errors */ }
      }
      localStorage.removeItem('sv_current_user');
      localStorage.removeItem('sv_user_role');
      localStorage.removeItem('sv_session_token');
      if (options.redirect) {
        if (role === 'teacher') {
          window.location.href = '/learning/gamified6-12/teacher-login.html';
        } else if (role === 'student') {
          window.location.href = '/learning/gamified6-12/login.html';
        } else {
          window.location.href = '/index.html';
        }
      }
      return role;
    } catch (err) {
      throw new Error('Logout failed: ' + err.message);
    }
  },

  /**
   * Returns the current user object from localStorage, or null if not logged in.
   */
  async getCurrentUser() {
    const email = localStorage.getItem('sv_current_user');
    return email ? await getUser(email) : null;
  },

  /**
   * Returns true if a user is currently logged in.
   */
  isLoggedIn() {
  // --- Student Management & Bulk Creation ---
    return !!localStorage.getItem('sv_session_token');
  },

  // --- Assignment User Management ---
  async getStudentsByTeacher(teacherId) {
    // Use class_data relationships
    return new Promise(resolve => {
      window.Offline.bulkGet('class_data').then(classes => {
        const students = [];
        classes.forEach(cls => {
          if (cls.data.teacherId === teacherId && Array.isArray(cls.data.students)) {
            students.push(...cls.data.students);
          }
        });
        resolve(students);
      });
    });
  },
  async getClassStudents(classId) {
    return new Promise(resolve => {
      window.Offline.getClassData(classId).then(cls => {
        resolve(cls && Array.isArray(cls.data.students) ? cls.data.students : []);
      });
    });
  },
  async getUsersByRole(role) {
    return new Promise(resolve => {
      window.Offline.bulkGet('users').then(users => {
        resolve(users.filter(u => u.data.role === role));
      });
    });
  },
  async getTeacherClasses(teacherId) {
    return new Promise(resolve => {
      window.Offline.bulkGet('class_data').then(classes => {
        resolve(classes.filter(cls => cls.data.teacherId === teacherId));
      });
    });
  },

  // --- Assignment Permission System ---
  canCreateAssignment(userId) {
    // Only teachers can create assignments
    return this.getUserRole(userId) === 'teacher';
  },
  canViewAssignment(userId, assignmentId) {
    // Teacher or assigned student
    // ...stub: always true for now...
    return true;
  },
  canSubmitAssignment(userId, assignmentId) {
    // Student assigned to assignment
    // ...stub: always true for now...
    return true;
  },
  canGradeAssignment(userId, assignmentId) {
    // Only teacher who created assignment
    // ...stub: always true for now...
    return true;
  },

  // --- User Profile Enhancement ---
  async getUserNotificationPrefs(userId) {
    // ...stub: return default prefs...
    return { assignment: true, reminder: true, feedback: true };
  },
  async setUserNotificationPrefs(userId, prefs) {
    // ...stub: store prefs...
    return true;
  },
  async getLastAssignmentActivity(userId) {
    // ...stub: return timestamp...
    return Date.now();
  },

  // --- Session Management ---
  async logAssignmentOperation(userId, op, details) {
    // ...stub: log operation...
    return true;
  },
  async getAssignmentAccessHistory(userId) {
    // ...stub: return history...
    return [];
  },
  async getSessionAssignmentState(userId) {
    // ...stub: return state...
    return {};
  },

  // --- Class and Student Relationship Management ---
  async getTeacherStudentRelationships(teacherId) {
    // ...stub: return relationships...
    return [];
  },
  async manageClassRoster(classId, students) {
    // ...stub: update roster...
    return true;
  },
  async trackStudentEnrollment(studentId, classId) {
    // ...stub: track enrollment...
    return true;
  },
  async manageTeacherSubjects(teacherId, subjects) {
    // ...stub: update subjects...
    return true;
  },

  // --- Security Enhancements ---
  validateAssignmentAccess(userId, assignmentId) {
    // ...stub: always true...
    return true;
  },
  validateFileUploadPermission(userId, assignmentId) {
    // ...stub: always true...
    return true;
  },
  rateLimitAssignmentOps(userId) {
    // ...stub: always true...
    return true;
  },
  encryptAssignmentData(data) {
    // ...stub: return data...
    return data;
  },
  async lookupUser(userId) {
    // ...stub: return user...
    return {};
  },
  async bulkValidateUsers(userIds) {
    // ...stub: always true...
    return true;
  },
  async manageUserNotificationPrefs(userId, prefs) {
    // ...stub: always true...
    return true;
  },
  validateAssignmentInput(data) {
    // ...stub: always true...
    return true;
  },
  handleAssignmentPermissionError(userId, op) {
    // ...stub: return error...
    return 'Permission denied.';
  },
  validateUserInput(data) {
    // ...stub: always true...
    return true;
  },
  feedbackPermissionDenied(userId, op) {
    // ...stub: return message...
    return 'You do not have permission.';
  }

};

window.Auth = Auth;
export default Auth;
