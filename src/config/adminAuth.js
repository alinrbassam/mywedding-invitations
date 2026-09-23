// Laylitna Admin Authentication Configuration

// Default master password (can be customized here or changed via localStorage)
export const DEFAULT_ADMIN_PASSWORD = 'admin';

const AUTH_STORAGE_KEY = 'laylitna_admin_auth';
const PASSWORD_OVERRIDE_KEY = 'laylitna_admin_custom_pwd';

/**
 * Check if current session has verified admin access
 */
export function isSessionAdmin() {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

/**
 * Get current active password (custom or default)
 */
export function getActiveAdminPassword() {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_PASSWORD;
  return localStorage.getItem(PASSWORD_OVERRIDE_KEY) || DEFAULT_ADMIN_PASSWORD;
}

/**
 * Verify input password and authenticate session if valid
 */
export function authenticateAdmin(passwordInput) {
  if (!passwordInput) return false;
  const currentPassword = getActiveAdminPassword();
  
  const isValid = passwordInput.trim() === currentPassword.trim();
  if (isValid) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    // Also keep compatibility with internal bridge flags
    sessionStorage.setItem('wbg_admin_auth', 'true');
    return true;
  }
  return false;
}

/**
 * Sign out / Lock Admin Studio
 */
export function deauthenticateAdmin() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem('wbg_admin_auth');
  localStorage.removeItem('wbg_admin_mode');
}

/**
 * Update the admin password
 */
export function updateAdminPassword(oldPassword, newPassword) {
  if (!authenticateAdmin(oldPassword)) {
    return { success: false, error: 'Current password is incorrect.' };
  }
  if (!newPassword || newPassword.trim().length < 4) {
    return { success: false, error: 'New password must be at least 4 characters long.' };
  }
  localStorage.setItem(PASSWORD_OVERRIDE_KEY, newPassword.trim());
  return { success: true };
}
