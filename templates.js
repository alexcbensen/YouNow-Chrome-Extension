const templates = {
    createPinPrompt: `
        <div style="
            background: #1a1a1a;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            border: 1px solid #333;
        ">
            <h2 style="color: white; margin: 0 0 10px 0; font-family: proxima-nova, sans-serif;">Create PIN</h2>
            <p style="color: #888; margin: 0 0 20px 0; font-family: proxima-nova, sans-serif;">Set up a PIN to protect your admin panel</p>
            <input type="password" id="admin-pin-input" placeholder="Enter PIN" maxlength="10" style="
                background: #2a2a2a;
                border: 1px solid #444;
                border-radius: 8px;
                padding: 12px 20px;
                color: white;
                font-size: 18px;
                text-align: center;
                width: 200px;
                outline: none;
                display: block;
                margin: 0 auto 10px auto;
            " />
            <input type="password" id="admin-pin-confirm" placeholder="Confirm PIN" maxlength="10" style="
                background: #2a2a2a;
                border: 1px solid #444;
                border-radius: 8px;
                padding: 12px 20px;
                color: white;
                font-size: 18px;
                text-align: center;
                width: 200px;
                outline: none;
                display: block;
                margin: 0 auto;
            " />
            <div style="margin-top: 20px;">
                <button id="admin-pin-submit" style="
                    background: #22c55e;
                    border: none;
                    border-radius: 8px;
                    padding: 10px 30px;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    margin-right: 10px;
                ">Create</button>
                <button id="admin-pin-cancel" style="
                    background: #444;
                    border: none;
                    border-radius: 8px;
                    padding: 10px 30px;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                ">Cancel</button>
            </div>
            <p id="admin-pin-error" style="color: #ef4444; margin: 15px 0 0 0; display: none;"></p>
        </div>
    `,

    pinPrompt: `
        <div style="
            background: #1a1a1a;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            border: 1px solid #333;
        ">
            <h2 style="color: white; margin: 0 0 20px 0; font-family: proxima-nova, sans-serif;">Enter PIN</h2>
            <input type="password" id="admin-pin-input" maxlength="10" style="
                background: #2a2a2a;
                border: 1px solid #444;
                border-radius: 8px;
                padding: 12px 20px;
                color: white;
                font-size: 18px;
                text-align: center;
                width: 150px;
                outline: none;
            " />
            <div style="margin-top: 20px;">
                <button id="admin-pin-submit" style="
                    background: #22c55e;
                    border: none;
                    border-radius: 8px;
                    padding: 10px 30px;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    margin-right: 10px;
                ">Unlock</button>
                <button id="admin-pin-cancel" style="
                    background: #444;
                    border: none;
                    border-radius: 8px;
                    padding: 10px 30px;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                ">Cancel</button>
            </div>
            <p id="admin-pin-error" style="color: #ef4444; margin: 15px 0 0 0; display: none;">Incorrect PIN</p>
        </div>
    `,

    adminPanel: `
        <div style="
            background: #1a1a1a;
            border-radius: 12px;
            padding: 30px;
            min-width: 400px;
            min-height: 300px;
            border: 1px solid #333;
            position: relative;
        ">
            <button id="admin-panel-close" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: #888;
                font-size: 24px;
                cursor: pointer;
            ">&times;</button>
            <h2 style="color: white; margin: 0 0 20px 0; font-family: proxima-nova, sans-serif;">Admin Panel</h2>
            <div id="admin-panel-content" style="color: #888; font-family: proxima-nova, sans-serif;">
                <!-- Content will be added here later -->
                <p>Panel content coming soon...</p>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333;">
                <button id="admin-panel-lock" style="
                    background: #444;
                    border: none;
                    border-radius: 8px;
                    padding: 8px 16px;
                    color: white;
                    font-size: 14px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                "><i class="bi bi-lock-fill"></i> Lock Panel</button>
            </div>
        </div>
    `
};