// Admin panel functionality

let verifiedAdmin = null;
let adminButtonPending = false;

function isAdminUnlocked() {
    return sessionStorage.getItem('adminUnlocked') === 'true';
}

function unlockAdmin() {
    sessionStorage.setItem('adminUnlocked', 'true');
}

function getStoredPIN() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(['adminPINHash'], (result) => {
            resolve(result.adminPINHash || null);
        });
    });
}

function setStoredPIN(pinHash) {
    return new Promise((resolve) => {
        chrome.storage.sync.set({ adminPINHash: pinHash }, () => {
            resolve();
        });
    });
}

async function verifyAdminUser() {
    if (verifiedAdmin !== null) return verifiedAdmin;
    
    const usernameEl = document.querySelector('app-profile-dropdown .username');
    if (!usernameEl) return false;
    
    const username = usernameEl.textContent.trim();
    
    try {
        const response = await fetch(`https://api.younow.com/php/api/broadcast/info/user=${username}`);
        const data = await response.json();
        verifiedAdmin = data.userId?.toString() === ADMIN_USER_ID;
        return verifiedAdmin;
    } catch (e) {
        return false;
    }
}

async function createAdminPanelEntry() {
    if (document.getElementById('admin-panel-btn') || adminButtonPending) return;
    
    const currenciesWrapper = document.querySelector('app-profile-dropdown .currencies-infos-wrapper > div');
    if (!currenciesWrapper) return;
    
    adminButtonPending = true;
    
    const isAdmin = await verifyAdminUser();
    if (!isAdmin) {
        adminButtonPending = false;
        return;
    }
    
    if (document.getElementById('admin-panel-btn')) {
        adminButtonPending = false;
        return;
    }
    
    const isUnlocked = isAdminUnlocked();
    
    const adminBtn = document.createElement('button');
    adminBtn.id = 'admin-panel-btn';
    adminBtn.className = 'button';
    adminBtn.style.cssText = `
        background: #444;
        border: none;
        border-radius: 100rem;
        padding: 0.65rem 1.25rem;
        color: white;
        cursor: pointer;
        margin-top: 10px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 500;
        font-family: proxima-nova, sans-serif;
        width: auto;
    `;
    adminBtn.innerHTML = `<i class="bi ${isUnlocked ? 'bi-unlock-fill' : 'bi-lock-fill'}" id="admin-lock-icon"></i><span>Admin Panel</span>`;
    adminBtn.title = 'Admin Panel';
    
    adminBtn.addEventListener('click', handleAdminClick);
    
    const barsBtn = currenciesWrapper.querySelector('.button--purple');
    if (barsBtn) {
        barsBtn.parentNode.insertBefore(adminBtn, barsBtn.nextSibling);
    }
    
    adminButtonPending = false;
}

async function handleAdminClick() {
    const popover = document.querySelector('ngb-popover-window');
    if (popover) popover.remove();
    
    document.body.click();
    
    if (isAdminUnlocked()) {
        openAdminPanel();
    } else {
        const storedPIN = await getStoredPIN();
        if (storedPIN) {
            showPinPrompt();
        } else {
            showCreatePinPrompt();
        }
    }
}

function showCreatePinPrompt() {
    const existing = document.getElementById('admin-pin-overlay');
    if (existing) existing.remove();
    
    const overlay = createOverlay('admin-pin-overlay', templates.createPinPrompt);
    document.body.appendChild(overlay);
    
    const pinInput = document.getElementById('admin-pin-input');
    const confirmInput = document.getElementById('admin-pin-confirm');
    const submitBtn = document.getElementById('admin-pin-submit');
    const cancelBtn = document.getElementById('admin-pin-cancel');
    const errorMsg = document.getElementById('admin-pin-error');
    
    pinInput.focus();
    
    const tryCreate = async () => {
        const pin = pinInput.value;
        const confirm = confirmInput.value;
        
        if (pin.length < 4) {
            errorMsg.textContent = 'PIN must be at least 4 characters';
            errorMsg.style.display = 'block';
            return;
        }
        
        if (pin !== confirm) {
            errorMsg.textContent = 'PINs do not match';
            errorMsg.style.display = 'block';
            confirmInput.value = '';
            confirmInput.focus();
            return;
        }
        
        const pinHash = await hashPIN(pin);
        await setStoredPIN(pinHash);
        unlockAdmin();
        overlay.remove();
        updateAdminIcon();
        openAdminPanel();
    };
    
    submitBtn.addEventListener('click', tryCreate);
    confirmInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') tryCreate();
    });
    cancelBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}

function showPinPrompt() {
    const existing = document.getElementById('admin-pin-overlay');
    if (existing) existing.remove();
    
    const overlay = createOverlay('admin-pin-overlay', templates.pinPrompt);
    document.body.appendChild(overlay);
    
    const input = document.getElementById('admin-pin-input');
    const submitBtn = document.getElementById('admin-pin-submit');
    const cancelBtn = document.getElementById('admin-pin-cancel');
    const errorMsg = document.getElementById('admin-pin-error');
    
    input.focus();
    
    const tryUnlock = async () => {
        const storedHash = await getStoredPIN();
        const inputHash = await hashPIN(input.value);
        if (inputHash === storedHash) {
            unlockAdmin();
            overlay.remove();
            updateAdminIcon();
            openAdminPanel();
        } else {
            errorMsg.style.display = 'block';
            input.value = '';
            input.focus();
        }
    };
    
    submitBtn.addEventListener('click', tryUnlock);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') tryUnlock();
    });
    cancelBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}

function updateAdminIcon() {
    const icon = document.getElementById('admin-lock-icon');
    if (icon) {
        icon.className = isAdminUnlocked() ? 'bi bi-unlock-fill' : 'bi bi-lock-fill';
    }
}

function openAdminPanel() {
    const existing = document.getElementById('admin-panel-overlay');
    if (existing) existing.remove();
    
    const overlay = createOverlay('admin-panel-overlay', templates.adminPanel);
    document.body.appendChild(overlay);
    
    const closeBtn = document.getElementById('admin-panel-close');
    closeBtn.addEventListener('click', () => overlay.remove());
    
    const lockBtn = document.getElementById('admin-panel-lock');
    lockBtn.addEventListener('click', () => {
        sessionStorage.removeItem('adminUnlocked');
        updateAdminIcon();
        overlay.remove();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}
