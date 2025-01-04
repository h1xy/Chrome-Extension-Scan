class ExtensionChecker {
    constructor() {
        this.extensions = [
            { name: "VPNCity", id: "nnpnnpemnckcfdebeekibpiijlicmpom", version: "2.0.1" },
            { name: "Parrot Talks", id: "kkodiihpgodmdankclfibbiphjkfdenh", version: "1.16.2" },
            { name: "Uvoice", id: "oaikpkmjciadfpddlpjjdapglcihgdle", version: "1.0.12" },
            { name: "Internxt VPN", id: "dpggmcodlahmljkhlmpgpdcffdaoccni", version: "1.1.1" },
            { name: "Bookmark Favicon Changer", id: "acmfnomgphggonodopogfbmkneepfgnh", version: "4.00" },
            { name: "Castorus", id: "mnhffkhmpnefgklngfmlndmkimimbphc", version: "4.40" },
            { name: "Wayin AI", id: "cedgndijpacnfbdggppddacngjfdkaca", version: "0.0.11" },
            { name: "Search Copilot AI Assistant", id: "bbdnohkpnbkdkmnkddobeafboooinpla", version: "1.0.1" },
            { name: "VidHelper", id: "egmennebgadmncfjafcemlecimkepcle", version: "2.2.7" },
            { name: "AI Assistant", id: "bibjgkidgpfbblifamdlkdlhgihmfohh", version: "0.1.3" },
            { name: "TinaMind", id: "befflofjcniongenjmbkgkoljhgliihe", version: "2.13.0" },
            { name: "Bard AI chat", id: "pkgciiiancapdlpcbppfkmeaieppikkk", version: "1.3.7" },
            { name: "Reader Mode", id: "llimhhconnjiflfimocjggfjdlmlhblm", version: "1.5.7" },
            { name: "Primus", id: "oeiomhmbaapihbilkfkhmlajkeegnjhe", version: "3.18.0" },
            { name: "Cyberhaven security", id: "pajkjnmeojmbapicmbpliphjmcekeaac", version: "24.10.4" },
            { name: "GraphQL Network Inspector", id: "ndlbedplllcgconngcnfmkadhokfaaln", version: "2.22.6" },
            { name: "GPT 4 Summary", id: "epdjhgbipjpbbhoccdeipghoihibnfja", version: "1.4" },
            { name: "Vidnoz Flex", id: "cplhlgabfijoiabgkigdafklbhhdkahj", version: "1.0.161" },
            { name: "YesCaptcha assistant", id: "jiofmdifioeejeilfkpegipdjiopiekl", version: "1.1.61" },
            { name: "Proxy SwitchyOmega", id: "hihblcmlaaademjlakdpicchbjnnnkbo", version: "3.0.2" },
            { name: "Reader Mode", id: "llimhhconnjiflfimocjggfjdlmlhblm", version: "1.5.7" },
			{ name: "Tackker", id: "ekpkdmohpdnebfedjjfklhpefgpgaaji", version: "1.3" },
			{ name: "AI Shop Buddy", id: "epikoohpebngmakjinphfiagogjcnddm", version: "2.7.3" },
			{ name: "Sort by Oldest", id: "miglaibdlgminlepgeifekifakochlka", version: "1.4.5" },
			{ name: "Rewards Search Automator", id: "eanofdhdfbcalhflpbdipkjjkoimeeod", version: "1.4.9" },
			{ name: "Earny", id: "ogbhbgkiojdollpjbhbamafmedkeockb", version: "1.8.1" },
			{ name: "ChatGPT Assistant", id: "bgejafhieobnfpjlpcjjggoboebonfcg", version: "1.1.1" },
			{ name: "Keyboard History Recorder", id: "igbodamhgjohafcenbcljfegbipdfjpk", version: "2.3" },
			{ name: "Email Hunter", id: "mbindhfolmpijhodmgkloeeppmkhpmhc", version: "1.44" },
			{ name: "Visual Effects for Google Meet", id: "hodiladlefdpcbemnbbcpclbmknkiaem", version: "3.1.3" },
			{ name: "ChatGPT App", id: "lbneaaedflankmgmfbmaplggbmjjmbae", version: "1.3.8" },
			{ name: "Web Mirror", id: "eaijffijbobmnonfhilihbejadplhddo", version: "2.4" },
			{ name: "Hi AI", id: "hmiaoahjllhfgebflooeeefeiafpkfde", version: "1.0.0" }
        ];
    }

    async checkExtensions() {
        const results = [];
        
        for (const ext of this.extensions) {
            try {
                const installed = await this.isExtensionInstalled(ext.id);
                results.push({
                    name: ext.name,
                    id: ext.id,
                    expectedVersion: ext.version,
                    installed: installed.installed,
                    currentVersion: installed.version || 'N/A',
                    status: this.getStatus(installed, ext.version)
                });
            } catch (error) {
                console.error(`Error checking ${ext.name}:`, error);
                results.push({
                    name: ext.name,
                    id: ext.id,
                    expectedVersion: ext.version,
                    installed: false,
                    currentVersion: 'Error',
                    status: 'Error checking extension'
                });
            }
        }

        return results;
    }

    async isExtensionInstalled(extensionId) {
        return new Promise((resolve) => {
            // 使用 Chrome Extension Management API
            chrome.management.get(extensionId, (extensionInfo) => {
                if (chrome.runtime.lastError) {
                    resolve({ installed: false, version: null });
                } else {
                    resolve({ 
                        installed: true, 
                        version: extensionInfo.version,
                        enabled: extensionInfo.enabled
                    });
                }
            });
        });
    }

    getStatus(installed, expectedVersion) {
        if (!installed.installed) return 'Not Installed';
        if (!installed.enabled) return 'Installed but Disabled';
        if (installed.version === expectedVersion) return 'Version Match';
        return `Version Mismatch (Current: ${installed.version})`;
    }

    createReport(results) {
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Extension Name</th>
                <th>ID</th>
                <th>Malicious Version</th>
                <th>Current Version</th>
                <th>Status</th>
            </tr>
        `;

        results.forEach(result => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${result.name}</td>
                <td>${result.id}</td>
                <td>${result.expectedVersion}</td>
                <td>${result.currentVersion}</td>
                <td>${result.status}</td>
            `;
        });

        return table;
    }
}