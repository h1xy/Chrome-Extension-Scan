// popup.js
document.addEventListener('DOMContentLoaded', async () => {
    const checker = new ExtensionChecker();
    const results = await checker.checkExtensions();
    const table = checker.createReport(results);
    document.getElementById('results').appendChild(table);
});